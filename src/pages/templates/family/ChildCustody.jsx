import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'court_name', label: 'عدالت کا نام' },
  { id: 'police_station', label: 'تھانہ' },
  { id: 'accused_name', label: 'سائلہ کا نام' },
  { id: 'father_name', label: 'والد کا نام' },
  { id: 'husband_name', label: 'شوہر کا نام' },
  { id: 'caste', label: 'قوم' },
  { id: 'address', label: 'پتہ' },
  { id: 'officer', label: 'تحقیقی افسر', type: 'textarea', rows: 3 },
  { id: 'involved_persons', label: 'شامل افراد', type: 'textarea', rows: 3 },
  { id: 'sections', label: 'زیر دفعہ' },
  { id: 'child_details', label: 'بچے کی تفصیل', type: 'textarea', rows: 2 },
  { id: 'note_points', label: 'دلائل', type: 'textarea', rows: 10 },
  { id: 'respondent_number', label: 'رسپانڈنٹس نمبر' },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'lawyer_name', label: 'وکیل کا نام' },
  { id: 'lawyer_address', label: 'وکیل کا پتہ' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 18, direction: 'rtl' };

export default function ChildCustody() {
  const renderDocument = (v) => {
    const points = v.note_points ? v.note_points.split('\n').filter(Boolean) : [];
    return (
      <div style={rtlStyle}>
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <p style={{ margin: 0, fontSize: 27 }}>بعدالت جناب <PlaceholderSpan value={v.court_name} /> تھانہ <PlaceholderSpan value={v.police_station} /></p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <PlaceholderSpan value={v.accused_name} /> بنت <PlaceholderSpan value={v.father_name} /> قوم <PlaceholderSpan value={v.caste} /> ساکنہ <PlaceholderSpan value={v.address} />
          <span style={{ display: 'block', fontSize: 16 }}>----(سائلہ)</span>
        </div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}><p>بنـام</p></div>
        {v.involved_persons && <div style={{ textAlign: 'center', fontSize: 16 }}><p>{v.involved_persons}</p></div>}
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <p style={{ fontSize: 22, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست حضانت</p>
        </div>
        {v.child_details && <div style={{ fontSize: 16, marginBottom: 10 }}><p>بچے کی تفصیل: {v.child_details}</p></div>}
        <p style={{ fontSize: 16 }}>جناب عالی! سائلہ حسبِ ذیل عرض پرداز ہے۔</p>
        <ul style={{ fontSize: 16, listStyle: 'none', paddingRight: 0, minHeight: 100 }}>
          {points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <p style={{ fontSize: 16, textAlign: 'center', margin: '20px auto 0', width: '45%', marginRight: '65%' }}>
          حالات بالا کے پیش نظر استدعا ہے کہ سائلہ کی درخواست حضانت منظور فرمائی جائے۔
        </p>
        <div style={{ fontSize: 16, marginTop: 20, marginRight: '75%' }}>
          <p>مورخہ <PlaceholderSpan value={v.case_date} /></p>
          <p><PlaceholderSpan value={v.accused_name} /></p>
          <p>بذریعہ کونسل</p>
          <span style={{ fontWeight: 'bold', fontSize: 18 }}><PlaceholderSpan value={v.lawyer_name} /></span><br />
          <span>ایڈووکیٹ ہائیکورٹ</span><br />
          <span><PlaceholderSpan value={v.lawyer_address} /></span>
        </div>
      </div>
    );
  };
  return <UrduLegalTemplate slug="child-custody" title="Create Child Custody Application" fields={fields} renderDocument={renderDocument} />;
}
