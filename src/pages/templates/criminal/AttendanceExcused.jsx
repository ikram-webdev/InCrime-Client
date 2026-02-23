import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'judge_name', label: 'جج کا نام' },
  { id: 'court_name', label: 'عدالت کا نام' },
  { id: 'accused_name', label: 'ملزم کا نام' },
  { id: 'case_no', label: 'مقدمہ نمبر' },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'crime', label: 'بجرم' },
  { id: 'police_station', label: 'تھانہ' },
  { id: 'note_points', label: 'دلائل', type: 'textarea', rows: 10 },
  { id: 'lawyer_name', label: 'وکیل کا نام' },
  { id: 'lawyer_address', label: 'وکیل کا پتہ' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 20, direction: 'rtl' };

export default function AttendanceExcused() {
  const renderDocument = (v) => {
    const points = v.note_points ? v.note_points.split('\n').filter(Boolean) : [];
    return (
      <div style={rtlStyle}>
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <p style={{ margin: 0, fontSize: 27 }}>
            بعدالت جناب <PlaceholderSpan value={v.judge_name} /> صاحب <PlaceholderSpan value={v.court_name} />
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <span style={{ fontSize: 20, fontWeight: 'bold', textDecoration: 'underline' }}>
            مقدمہ نمبر <PlaceholderSpan value={v.case_no} /> مورخہ <PlaceholderSpan value={v.case_date} /> بجرم <PlaceholderSpan value={v.crime} /><br />تھانہ <PlaceholderSpan value={v.police_station} />
          </span>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <p style={{ fontSize: 22, margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست معافی حاضری</p>
        </div>
        <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
          <p>جناب عالی!سائل حسبِ ذیل عرض پرداز ہے۔</p>
        </div>
        <ul style={{ fontSize: 16, listStyle: 'none', paddingRight: 0, minHeight: 100 }}>
          {points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <p style={{ fontSize: 16, textAlign: 'center', margin: '20px auto 0', width: '45%', marginRight: '65%' }}>
          حالات بالا کے پیش نظر استدعا ہے کہ سائل کی حاضری معاف فرمائی جائے۔
        </p>
        <div style={{ fontSize: 16, marginTop: 20, marginRight: '75%' }}>
          <p>مورخہ <PlaceholderSpan value={v.case_date} /></p>
          <p style={{ fontWeight: 'bold' }}>عــــرضـــے</p>
          <p><PlaceholderSpan value={v.accused_name} /></p>
          <p>بذریعہ کونسل</p>
          <span style={{ fontWeight: 'bold', fontSize: 18 }}><PlaceholderSpan value={v.lawyer_name} /></span><br />
          <span>ایڈووکیٹ ہائیکورٹ</span><br />
          <span><PlaceholderSpan value={v.lawyer_address} /></span>
        </div>
      </div>
    );
  };
  return <UrduLegalTemplate slug="attendance-excused" title="Create Attendance Excused Application" fields={fields} renderDocument={renderDocument} />;
}
