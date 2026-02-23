import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'court_name', label: 'عدالت کا نام' },
  { id: 'accused_name', label: 'ملزم کا نام' },
  { id: 'father_name', label: 'والد کا نام' },
  { id: 'caste', label: 'قوم' },
  { id: 'address', label: 'پتہ' },
  { id: 'case_no', label: 'مقدمہ نمبر' },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'sections', label: 'زیر دفعہ' },
  { id: 'police_station', label: 'تھانہ' },
  { id: 'note_points', label: 'دلائل', type: 'textarea', rows: 10 },
  { id: 'lawyer_name', label: 'وکیل کا نام' },
  { id: 'lawyer_address', label: 'وکیل کا پتہ' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 20, direction: 'rtl' };

export default function BailPost() {
  const renderDocument = (v) => {
    const points = v.note_points ? v.note_points.split('\n').filter(Boolean) : [];
    return (
      <div style={rtlStyle}>
        <div style={{ textAlign: 'center', marginBottom: 25, marginTop: -30 }}>
          <p style={{ margin: 0, fontSize: 27 }}>
            بعدالت جناب <PlaceholderSpan value={v.court_name} /> تھانہ <PlaceholderSpan value={v.police_station} />
          </p>
        </div>
        <br /><br /><br />
        <div style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 10, textAlign: 'center' }}>
          <PlaceholderSpan value={v.accused_name} /> ولد <PlaceholderSpan value={v.father_name} /> قوم <PlaceholderSpan value={v.caste} /> سکنه <PlaceholderSpan value={v.address} />
          <span style={{ display: 'block', fontSize: 18, marginTop: 4, textAlign: 'left' }}>----(سائل / ملزم)</span>
        </div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          <p>بنــــــــــام</p><p>ســـــــــــرکار</p>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <span style={{ fontSize: 20, fontWeight: 'bold', textDecoration: 'underline' }}>
            مقدمہ نمبر <PlaceholderSpan value={v.case_no} /> مورخہ <PlaceholderSpan value={v.case_date} /> بجرم زیر دفعہ <PlaceholderSpan value={v.sections} /><br />تھانہ <PlaceholderSpan value={v.police_station} />
          </span>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <p style={{ fontSize: 22, margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست ضمانت بعد از گرفتاری</p>
        </div>
        <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
          <p>جناب عالی!سائل حسبِ ذیل عرض پرداز ہے۔</p>
        </div>
        <ul style={{ fontSize: 16, listStyle: 'none', paddingRight: 0, minHeight: 100 }}>
          {points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <p style={{ fontSize: 16, textAlign: 'center', margin: '20px auto 0', width: '45%', marginRight: '65%' }}>
          حالات بالا کے پیش نظر استدعا ہے کہ سائل کی درخواست ضمانت بعد از گرفتاری منظور فرمائی جائے۔
        </p>
        <div style={{ fontSize: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
          <div style={{ textAlign: 'center', marginRight: '75%' }}>
            <p>مورخہ <PlaceholderSpan value={v.case_date} /></p>
            <p style={{ fontWeight: 'bold', fontSize: 19 }}>عــــــــــرضـــــــــے</p>
            <p>{v.accused_name ? `(سائل / ملزم) ---- ${v.accused_name}` : <PlaceholderSpan value="" />}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, textAlign: 'center', marginRight: '75%' }}>
            <p>بذریعہ کونسل</p>
            <span style={{ fontWeight: 'bold', fontSize: 18 }}><PlaceholderSpan value={v.lawyer_name} /></span>
            <span style={{ fontWeight: 'bold', fontSize: 18 }}>ایڈووکیٹ ہائیکورٹ</span>
            <span style={{ fontSize: 16 }}><PlaceholderSpan value={v.lawyer_address} /></span>
          </div>
        </div>
      </div>
    );
  };
  return <UrduLegalTemplate slug="bail-post" title="Create Post-Arrest Bail Application" fields={fields} renderDocument={renderDocument} />;
}
