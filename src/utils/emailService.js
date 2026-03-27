import emailjs from 'emailjs-com';

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_h3wu6rs',
  contactTemplateId:
    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_go18kya',
  enrollmentTemplateId:
    import.meta.env.VITE_EMAILJS_ENROLLMENT_TEMPLATE_ID ||
    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID ||
    'template_go18kya',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'O0hbQoXv1DqwQrSo5',
};

function ensureEmailConfig() {
  if (!emailConfig.serviceId || !emailConfig.publicKey) {
    throw new Error('Email service configuration is missing.');
  }
}

export async function sendContactEmail(formData) {
  ensureEmailConfig();

  return emailjs.send(
    emailConfig.serviceId,
    emailConfig.contactTemplateId,
    {
      ...formData,
      from_name: formData.user_name,
      reply_to: formData.user_email,
    },
    emailConfig.publicKey
  );
}

export async function sendEnrollmentEmail({ course, student }) {
  ensureEmailConfig();

  const fullName = `${student.firstName} ${student.lastName}`.trim();

  return emailjs.send(
    emailConfig.serviceId,
    emailConfig.enrollmentTemplateId,
    {
      subject: `Enrollment request for ${course.title}`,
      from_name: fullName,
      reply_to: student.email,
      student_name: fullName,
      student_email: student.email,
      student_phone: student.phone,
      course_title: course.title,
      course_category: course.category,
      course_price: `$${course.price}`,
      course_instructor: course.instructor,
      course_age_group: course.ageGroup,
      course_duration: course.duration,
      message: `${fullName} wants to enroll in ${course.title}. Contact: ${student.email}, ${student.phone}.`,
    },
    emailConfig.publicKey
  );
}
