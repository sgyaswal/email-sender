import React, { useState, ChangeEvent, FormEvent } from 'react';
// import './EmailForm.css'; // Importing the CSS file

// Defining the type for form data
interface FormData {
    email: string;
    subject: string;
    message: string;
}

const EmailForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        subject: '',
        message: '',
    });

    // Handling input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('https://email-sender-backend-1.onrender.com/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending email');
        }
    };

    return (
        <form className="email-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <button type="submit" className="send-button">
                Send
            </button>
        </form>
    );
};

export default EmailForm;
