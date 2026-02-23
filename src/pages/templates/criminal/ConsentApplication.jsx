import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'court_name', label: 'جج صاحب کا نام' },
  { id: 'case_no', label: 'مقدمہ نمبر' },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'police_station', label: 'تھانہ' },
  { id: 'sections', label: 'زیر دفعہ' },
  { id: 'crime', label: 'بجرم' },
  { id: 'note_points', label: 'دلائل', type: 'textarea', rows: 10 },
  { id: 'accused_name', label: 'ملزم کا نام' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 18, direction: 'rtl' };

export default function ConsentApplication() {
  const renderDocument = (v) => {
    const points = v.note_points ? v.note_points.split('\n').filter(Boolean) : [];
    return (
      <div style={rtlStyle}>
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <p style={{ margin: 0, fontSize: 27 }}>
            بعدالت جناب <PlaceholderSpan value={v.court_name} />
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <span style={{ fontSize: 20, fontWeight: 'bold', textDecoration: 'underline' }}>
            مقدمہ نمبر <PlaceholderSpan value={v.case_no} /> مورخہ <PlaceholderSpan value={v.case_date} /> بجرم <PlaceholderSpan value={v.crime} /><br />تھانہ <PlaceholderSpan value={v.police_station} />
          </span>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <p style={{ fontSize: 22, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست رضامندی</p>
        </div>
        <p style={{ fontSize: 16 }}>جناب عالی! درخواست گزار حسبِ ذیل عرض پرداز ہے۔</p>
        <ul style={{ fontSize: 16, listStyle: 'none', paddingRight: 0, minHeight: 100 }}>
          {points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <p style={{ fontSize: 16, textAlign: 'center', margin: '20px auto 0', width: '45%', marginRight: '65%' }}>
          حالات بالا کے پیش نظر استدعا ہے کہ درخواست گزار کی درخواست منظور فرمائی جائے۔
        </p>
        <div style={{ fontSize: 16, marginTop: 20, marginRight: '75%' }}>
          <p>مورخہ <PlaceholderSpan value={v.case_date} /></p>
          <p style={{ fontWeight: 'bold' }}>عرضے</p>
          <p><PlaceholderSpan value={v.accused_name} /></p>
        </div>
      </div>
    );
  };
  return <UrduLegalTemplate slug="consent" title="Create Consent Application" fields={fields} renderDocument={renderDocument} />;
}
