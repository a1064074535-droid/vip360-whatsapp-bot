const express = require('express');
const { twiml: { MessagingResponse } } = require('twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Main menu message
const mainMenu = `مرحباً بك في *VIP360* 🌟

خدماتنا:
1️⃣ خدمات حكومية
2️⃣ المكتبة الرقمية
3️⃣ بناء سيرة ذاتية
4️⃣ دعم فني
5️⃣ تواصل معنا

ارسل رقم الخيار للمتابعة`;

const govServices = `🏛️ *الخدمات الحكومية*

1 - تجديد الهوية الوطنية
2 - خدمات الجواز
3 - خدمات السجل التجاري
4 - خدمات العمالة

ارسل رقم الخدمة أو اكتب *رجوع* للقائمة الرئيسية`;

app.post('/webhook', (req, res) => {
  const twiml = new MessagingResponse();
  const incomingMsg = (req.body.Body || '').trim();
  const from = req.body.From || '';

  let responseText = '';

  const msg = incomingMsg.toLowerCase();

  if (msg === 'مرحبا' || msg === 'hi' || msg === 'hello' || msg === 'السلام عليكم' || msg === 'هلا' || msg === 'start' || msg === '0') {
    responseText = mainMenu;
  } else if (msg === '1') {
    responseText = govServices;
  } else if (msg === '2') {
    responseText = `📚 *المكتبة الرقمية*\n\nتصفح وحمل آلاف الكتب والموارد التعليمية.\n🔗 https://vip360.netlify.app\n\nاكتب *رجوع* للعودة`;
  } else if (msg === '3') {
    responseText = `📝 *بناء سيرة ذاتية*\n\nأنشئ سيرتك الذاتية باحترافية مع تحليل ATS.\n🔗 https://vip360.netlify.app/cv\n\nاكتب *رجوع* للعودة`;
  } else if (msg === '4') {
    responseText = `🛠️ *دعم فني*\n\nسنتواصل معك خلال 24 ساعة.\nيرجى وصف مشكلتك بالتفصيل.\n\nاكتب *رجوع* للعودة`;
  } else if (msg === '5') {
    responseText = `📞 *تواصل معنا*\n\nبريد: support@vip360.sa\nواتساب: https://wa.me/9665XXXXXXXX\nالموقع: https://vip360.netlify.app\n\nاكتب *رجوع* للعودة`;
  } else if (msg === 'رجوع' || msg === 'back' || msg === 'menu') {
    responseText = mainMenu;
  } else {
    responseText = `عذراً، لم أفهم طلبك. 🤔\nاكتب *مرحبا* أو *0* لعرض القائمة الرئيسية`;
  }

  twiml.message(responseText);
  res.type('text/xml');
  res.send(twiml.toString());
});

app.get('/', (req, res) => {
  res.send('VIP360 WhatsApp Bot is running!');
});

app.listen(PORT, () => {
  console.log(`VIP360 Bot running on port ${PORT}`);
});
