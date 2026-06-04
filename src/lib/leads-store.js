export async function saveLocalLead(leadData) {
    // نقوم فقط بطباعة البيانات في السجلات بدلاً من حفظها في ملف JSON
    console.log('📬 [Local Fallback] New Lead Received:', leadData);

    // نرجع كائن وهمي يحتوي على البيانات مع معرف زمني كبديل مؤقت
    return {
        id: Date.now().toString(),
        ...leadData,
        created_at: new Date().toISOString()
    };
}
