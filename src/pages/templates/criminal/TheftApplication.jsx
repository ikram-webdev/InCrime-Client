import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'court_name', label: 'عہدہ' },
  { id: 'police_station', label: 'شہر کا نام' },
  { id: 'fir_type', label: 'چوری شدہ چیز' },
  { id: 'note_points', label: 'دلائل', type: 'textarea', rows: 10 },
  { id: 'accused_name', label: 'نام' },
  { id: 'father_name', label: 'والد کا نام' },
  { id: 'address', label: 'پتہ' },
  { id: 'cnic_number', label: 'شناختی کارڈ نمبر' },
  { id: 'mobile_number', label: 'موبائل نمبر' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 18, direction: 'rtl' };

export default function TheftApplication() {
  const renderDocument = (v) => {
    const points = v.note_points ? v.note_points.split('\n').filter(Boolean) : [];
    return (
      <div style={rtlStyle}>
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <p style={{ margin: 0, fontSize: 27 }}>
            بعدالت <PlaceholderSpan value={v.court_name} /> شہر <PlaceholderSpan value={v.police_station} />
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <span style={{ fontSize: 20, fontWeight: 'bold', textDecoration: 'underline' }}>
            چوری / ڈکیتی: <PlaceholderSpan value={v.fir_type} />
          </span>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <p style={{ fontSize: 22, margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست ایف آئی آر</p>
        </div>
        <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
          <p>جناب عالی! درخواست گزار حسبِ ذیل عرض پرداز ہے۔</p>
        </div>
        <ul style={{ fontSize: 16, listStyle: 'none', paddingRight: 0, minHeight: 100 }}>
          {points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <div style={{ fontSize: 16, marginTop: 30 }}>
          <p>درخواست گزار: <PlaceholderSpan value={v.accused_name} /></p>
          <p>والد کا نام: <PlaceholderSpan value={v.father_name} /></p>
          <p>پتہ: <PlaceholderSpan value={v.address} /></p>
          <p>شناختی کارڈ: <PlaceholderSpan value={v.cnic_number} /></p>
          <p>موبائل: <PlaceholderSpan value={v.mobile_number} /></p>
        </div>
      </div>
    );
  };
  return <UrduLegalTemplate slug="theft" title="Create Theft / FIR Application" fields={fields} renderDocument={renderDocument} />;
}
