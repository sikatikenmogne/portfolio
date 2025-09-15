'use client';

import { useState } from 'react';
import { Send, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SocialLinks } from '@/components/navigation/SocialLinks';
import { HiOutlineMail } from 'react-icons/hi';
export function ContactSection({ profileData, socialLinks, variant = 'full' }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    gdprConsent: false,
  });
  const [status, setStatus] = useState('');
  const [gdprError, setGdprError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.gdprConsent) {
      setGdprError(true);
      return;
    }

    setStatus('sending');
    setGdprError(false);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID; // Replace with your actual Formspree form ID

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'gdprConsent' && checked) {
      setGdprError(false);
    }
  };

  return (
    <section
      className={`max-sm:px-4 max-sm:py-6 lg:mx-8 ${variant === 'preview' ? 'lg:py-24' : 'lg:py-8'}`}
    >
      <h2
        className={`text-3xl font-bold tracking-tight  ${variant === 'preview' ? 'mb-1 text-center' : 'mb-4 text-center text-4xl'}`}
      >
        {profileData.contact.title}
      </h2>
      <p
        className={`mt-2 mb-6 text-muted-foreground ${variant === 'preview' ? 'text-center' : 'text-center'}`}
      >
        {profileData.contact.description}
      </p>
      <div className="container mx-auto max-w-7xl p-8 bg-primary/10 rounded-lg shadow-sm">
        <div className="max-w-5xl mx-auto">
          {/* <p className="text-lg text-muted-foreground">{profileData.contact.subtitle}</p> */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {profileData.contact.form.name.label}
                  <span className="text-destructive ml-1 relative group cursor-help">
                    *
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded">
                      {profileData.contact.form.requiredField}
                    </span>
                  </span>
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={profileData.contact.form.name.placeholder}
                  required
                  className="w-full bg-white dark:bg-white border border-border/50 hover:border-border transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {profileData.contact.form.email.label}
                  <span className="text-destructive ml-1 relative group cursor-help">
                    *
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded">
                      {profileData.contact.form.requiredField}
                    </span>
                  </span>
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder={profileData.contact.form.email.placeholder}
                  required
                  className="w-full bg-white dark:bg-white border border-border/50 hover:border-border transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                {profileData.contact.form.subject.label}
                <span className="text-destructive ml-1 relative group cursor-help">
                  *
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded">
                    {profileData.contact.form.requiredField}
                  </span>
                </span>
              </label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder={profileData.contact.form.subject.placeholder}
                required
                className="w-full bg-white dark:bg-white border border-border/50 hover:border-border transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {profileData.contact.form.message.label}
                <span className="text-destructive ml-1 relative group cursor-help">
                  *
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity group-hover:opacity-100 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded">
                    {profileData.contact.form.requiredField}
                  </span>
                </span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder={profileData.contact.form.message.placeholder}
                required
                className="w-full min-h-[150px] bg-white dark:bg-white border border-border/50 hover:border-border transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y placeholder:text-muted-foreground/60"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdprConsent"
                  name="gdprConsent"
                  checked={formState.gdprConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded bg-white dark:bg-white border-border text-primary focus:ring-2 focus:ring-primary/20"
                />
                <div>
                  <label htmlFor="gdprConsent" className="font-medium">
                    {profileData.contact.form.gdpr.label}
                  </label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profileData.contact.form.gdpr.description}
                  </p>
                  {gdprError && (
                    <p className="mt-1 text-sm text-destructive">
                      {profileData.contact.form.gdpr.error}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-1 flex items-center gap-4">
                <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
                  <Send className="mr-2 h-4 w-4" />
                  {profileData.contact.form.submit}
                </Button>
              </div>

              {status === 'success' && (
                <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                  {profileData.contact.form.success}
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                  {profileData.contact.form.error}
                </p>
              )}
            </div>
          </form>

          {variant === 'full' && (
            <div className="mt-16">
              <h3 className="text-2xl font-semibold tracking-tight">
                {profileData.contact.alternateContact.title}
              </h3>
              <div className="mt-8 flex flex-col gap-12 max-w-5xl mx-auto">
                {/* Email Section */}
                {/* <div className="flex flex-col">
                  <h4 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <HiOutlineMail className="h-5 w-5 text-primary" />
                    {profileData.contact.alternateContact.email}
                  </h4>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      className="w-full max-w-[280px] hover:text-accent-foreground"
                      asChild
                    >
                      <a
                        href={`mailto:${profileData.personal.email}`}
                        className="flex items-center justify-center gap-2 text-base font-normal"
                      >
                        <span className="text-primary">{profileData.personal.email}</span>
                      </a>
                    </Button>
                  </div>
                </div> */}

                {/* Social Links Section */}
                <div className="flex flex-col">
                  <h4 className="text-lg font-medium mb-6 flex items-center  gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    {profileData.contact.alternateContact.social}
                  </h4>
                  <div className="flex items-center justify-center">
                    <SocialLinks socialLinks={socialLinks} className="justify-center" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
