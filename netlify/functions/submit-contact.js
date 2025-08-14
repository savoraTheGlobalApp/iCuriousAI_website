export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, role, message, recaptchaToken } = JSON.parse(event.body);

  // Verify reCAPTCHA
  const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: recaptchaToken
    })
  });

  const captchaData = await captchaRes.json();
  if (!captchaData.success) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid CAPTCHA" }) };
  }

  // Insert into Supabase
  const supabaseRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/contact_messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      "Prefer": "return=representation"
    },
    body: JSON.stringify({ name, email, role, message })
  });

  if (!supabaseRes.ok) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to insert into Supabase" }) };
  }

  const data = await supabaseRes.json();
  return { statusCode: 200, body: JSON.stringify({ success: true, data }) };
}
