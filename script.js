// 1. تفعيل النقر على منطقة رفع الصورة
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('perfumeImage');
const uploadText = document.getElementById('uploadText');

uploadArea.addEventListener('click', function() {
    fileInput.click();
});

// تغيير النص عند اختيار صورة
fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        uploadText.textContent = 'تم إرفاق: ' + this.files[0].name;
        uploadArea.style.borderColor = 'var(--cyan-main)';
    } else {
        uploadText.textContent = 'اضغط هنا لرفع صورة زجاجة العطر أو الكرتون';
        uploadArea.style.borderColor = 'var(--border-color)';
    }
});

// 2. إرسال البيانات إلى الـ Webhook والتحويل التلقائي
const form = document.getElementById('webhookForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // منع تحديث الصفحة الافتراضي

    // === تم تعديل الرابط هنا ليكون Webhook مخصص لاستقبال البيانات برمجياً ===
    const webhookURL = "https://info7.app.n8n.cloud/form/f251d4b1-d98c-4302-8def-f29ab76d79ad"; 
    
    // تغيير حالة الزر ليعرض للمستخدم أن الطلب قيد الإرسال والمعالجة
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = 'جاري البحث عن أفضل سعر... <i class="fa-solid fa-circle-notch fa-spin"></i>';
    submitBtn.disabled = true;

    // جمع البيانات من النموذج (بما فيها صورة العطر)
    const formData = new FormData(form);

    // إرسال البيانات عبر Fetch API إلى n8n
    fetch(webhookURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.ok) {
            // تفريغ الحقول وإعادة تهيئة الواجهة خلف الكواليس
            form.reset(); 
            uploadText.textContent = 'اضغط هنا لرفع صورة زجاجة العطر أو الكرتون';
            uploadArea.style.borderColor = 'var(--border-color)';

            // التعديل الاحترافي: تحويل المستخدم تلقائياً فوراً إلى صفحة العروض على Vercel
            window.location.href = "https://afdal-sir-search.vercel.app/";
        } else {
            alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('فشل الاتصال بالخادم. تأكد من إعدادات الـ Webhook واتصالك بالإنترنت.');
    })
    .finally(() => {
        // إعادة الزر لحالته الطبيعية في حال فشل الإرسال
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
    });
});
