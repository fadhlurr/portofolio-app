const { ContactMessage } = require("../models");

// Kirim notifikasi email lewat Resend API.
// Dibuat non-blocking: kalau email gagal, pesan tetap kesimpan ke DB
// dan user tetap dapat respon sukses.
async function sendNotificationEmail({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn(
      "Email notification skipped: RESEND_API_KEY or NOTIFY_EMAIL not set",
    );
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `Pesan baru dari ${name} — bbbyfadhlur.com`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #F4EFE5; color: #201C16;">
            <h2 style="margin: 0 0 16px; font-size: 20px;">Ada pesan baru masuk 👋</h2>
            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #DED5C2;">
              <p style="margin: 0 0 8px;"><strong>Dari:</strong> ${name}</p>
              <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 16px 0 8px;"><strong>Pesan:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin: 20px 0 0; font-size: 13px; color: #4A443B;">
              Balas langsung email ini untuk membalas ke ${name}.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Resend API error:", res.status, errBody);
    }
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}

// POST /api/contact  (public)
async function submitMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "name, email, and message are required" });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const saved = await ContactMessage.create({ name, email, message });

    // Kirim notifikasi email di background — jangan block response
    sendNotificationEmail({ name, email, message });

    res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    next(err);
  }
}

// GET /api/contact  (admin only)
async function getAllMessages(req, res, next) {
  try {
    const messages = await ContactMessage.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

// PUT /api/contact/:id/read  (admin only)
async function markAsRead(req, res, next) {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    await message.update({ read: true });
    res.json(message);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/contact/:id  (admin only)
async function deleteMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    await message.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { submitMessage, getAllMessages, markAsRead, deleteMessage };
