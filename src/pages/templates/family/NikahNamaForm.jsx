import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Chatbot Help', to: '/chatbot' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
];

function EditableField({ placeholder, style }) {
  const [value, setValue] = useState('');
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onInput={e => setValue(e.target.innerText)}
      data-placeholder={placeholder}
      style={{
        display: 'inline-block',
        minWidth: 80,
        borderBottom: value ? 'none' : '1px solid black',
        outline: 'none',
        padding: '0 5px',
        fontFamily: 'Times New Roman, serif',
        ...style,
      }}
    />
  );
}

export default function NikahNamaForm() {
  const tdStyle = { border: '1px solid black', padding: 10, verticalAlign: 'top', lineHeight: 1.6 };
  const tableStyle = { width: '100%', borderCollapse: 'collapse', fontFamily: 'Times New Roman, serif', fontSize: 15, tableLayout: 'fixed' };

  return (
    <div style={{ fontFamily: 'Times New Roman, serif', lineHeight: 1.6, background: '#f4f4f9', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90, paddingBottom: 40 }}>
      <style>{`
        @media print {
          nav, .form-section, .download-btn, #backToTop { display: none !important; }
          body { background: #fff !important; padding: 0 !important; }
        }
        [contenteditable]:empty::before { content: attr(data-placeholder); color: #aaa; }
      `}</style>

      <Navbar links={navLinks} showLogin={false} />

      <div style={{ width: 900, background: '#ffffff', padding: 25, border: '2px solid #0d2a3a', borderRadius: 12, boxShadow: '0 5px 15px rgba(0,0,0,0.15)', marginBottom: 30 }}>
        <h2 style={{ background: '#0d2a3a', color: '#fff', padding: '12px 15px', margin: '-25px -25px 20px', borderRadius: '10px 10px 0 0', fontSize: 20 }}>
          Nikah Nama Form — نکاح نامہ فارم
        </h2>
        <p style={{ color: '#555', fontSize: 14 }}>Click on any underlined field in the document below to fill in the information directly.</p>
      </div>

      <div style={{ width: 900, background: '#fff', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman, serif', textDecoration: 'underline' }}>نکاح نامہ / MARRIAGE CERTIFICATE</h2>
        
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>1. Registration Area:</strong><br />
                Ward: <EditableField placeholder="Ward" /> &nbsp; Town/Union: <EditableField placeholder="Town/Union" /> &nbsp; Tehsil/PS: <EditableField placeholder="Tehsil/PS" /> &nbsp; District: <EditableField placeholder="District" />
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, width: '50%' }}>
                <strong>2. Bridegroom (دولہا):</strong><br />
                Name: <EditableField placeholder="Bridegroom Name" /><br />
                Father's Name: <EditableField placeholder="Father Name" /><br />
                Residence: <EditableField placeholder="Residence" /><br />
                CNIC No.: <EditableField placeholder="CNIC" />
              </td>
              <td style={tdStyle}>
                <strong>3. Bride (دلہن):</strong><br />
                Name: <EditableField placeholder="Bride Name" /><br />
                Father's Name: <EditableField placeholder="Father Name" /><br />
                Residence: <EditableField placeholder="Residence" /><br />
                CNIC No.: <EditableField placeholder="CNIC" /><br />
                Status: <EditableField placeholder="Maiden/Widow/Divorced" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>
                <strong>4. Bridegroom Age/DOB:</strong><br />
                <EditableField placeholder="Age/DOB" />
              </td>
              <td style={tdStyle}>
                <strong>5. Bride Age/DOB:</strong><br />
                <EditableField placeholder="Bride Age/DOB" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>6. Vakil (وکیل / Guardian) of Bride:</strong><br />
                Name: <EditableField placeholder="Vakil Name" /> &nbsp; Father's Name: <EditableField placeholder="Father Name" /> &nbsp; Residence: <EditableField placeholder="Residence" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>7. Witnesses (گواہان) — Bridegroom Side:</strong><br />
                (i) Name: <EditableField placeholder="Witness1 Name" /> &nbsp; Father: <EditableField placeholder="Father Name" /> &nbsp; Address: <EditableField placeholder="Address" /><br />
                (ii) Name: <EditableField placeholder="Witness2 Name" /> &nbsp; Father: <EditableField placeholder="Father Name" /> &nbsp; Address: <EditableField placeholder="Address" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>8. Witnesses (گواہان) — Bride Side:</strong><br />
                (i) Name: <EditableField placeholder="Witness1 Name" /> &nbsp; Father: <EditableField placeholder="Father Name" /> &nbsp; Address: <EditableField placeholder="Address" /><br />
                (ii) Name: <EditableField placeholder="Witness2 Name" /> &nbsp; Father: <EditableField placeholder="Father Name" /> &nbsp; Address: <EditableField placeholder="Address" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>9. Nikah Khwan / Registrar:</strong><br />
                Name: <EditableField placeholder="Nikah Khwan Name" /> &nbsp; Father: <EditableField placeholder="Father Name" /> &nbsp; Residence: <EditableField placeholder="Residence" /><br />
                License No.: <EditableField placeholder="License No." /> &nbsp; Date: <EditableField placeholder="Date" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>10. Mehr (مہر):</strong><br />
                Amount: <EditableField placeholder="Mehr Amount" /> &nbsp; Deferred/Prompt: <EditableField placeholder="Deferred/Prompt" />
              </td>
            </tr>
            <tr>
              <td style={tdStyle} colSpan={2}>
                <strong>11. Special Conditions (خصوصی شرائط):</strong><br />
                <EditableField placeholder="Any special conditions..." style={{ width: '100%', minHeight: '3em', display: 'block' }} />
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>
                <strong>Bridegroom Signature:</strong><br />
                <div style={{ marginTop: 30, borderTop: '1px solid black', width: 150 }}></div>
                <EditableField placeholder="Name" />
              </td>
              <td style={tdStyle}>
                <strong>Bride Signature:</strong><br />
                <div style={{ marginTop: 30, borderTop: '1px solid black', width: 150 }}></div>
                <EditableField placeholder="Name" />
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={() => window.print()}
            className="download-btn"
            style={{ padding: '10px 25px', fontSize: 16, cursor: 'pointer', background: '#0d2a3a', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600 }}
          >
            Download / Print
          </button>
        </div>
      </div>
    </div>
  );
}
