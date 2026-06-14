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

// 2. إرسال البيانات إلى الـ Webhook
const form = document.getElementById('webhookForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // منع تحديث الصفحة

    // === ضع رابط الـ Webhook الخاص بك هنا ===
    const webhookURL =  "https://a41eea802ad81d.lhr.life/webhook-test/5bcf3cc8-91b9-4f14-b96b-44139f75ed94"; 
    
    // تغيير حالة الزر ليعرض للمستخدم أن الطلب قيد الإرسال
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = 'جاري البحث... <i class="fa-solid fa-circle-notch fa-spin"></i>';
    submitBtn.disabled = true;

    // جمع البيانات من النموذج (بما فيها الصورة)
    const formData = new FormData(form);

    // إرسال البيانات عبر Fetch API
    fetch(webhookURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.ok) {
            alert('تم الإرسال بنجاح! سيتم التواصل معك بأفضل سعر.');
            form.reset(); // تفريغ الحقول
            uploadText.textContent = 'اضغط هنا لرفع صورة زجاجة العطر أو الكرتون';
            uploadArea.style.borderColor = 'var(--border-color)';
        } else {
            alert('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('فشل الاتصال بالخادم. تأكد من اتصالك بالإنترنت.');
    })
    .finally(() => {
        // إعادة الزر لحالته الطبيعية
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
    });
});
