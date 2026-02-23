import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'court_name', label: 'جج کا نام' },
  { id: 'city', label: 'شہر کا نام' },
  { id: 'accused_name', label: 'مدعيه کا نام' },
  { id: 'father_name', label: 'مدعیہ کے والد کا نام' },
  { id: 'caste', label: 'قوم' },
  { id: 'address', label: 'پتہ' },
  { id: 'tehsil', label: 'تحصیل' },
  { id: 'district', label: 'ضلع' },
  { id: 'husband_name', label: 'مدعا عليه کا نام' },
  { id: 'husband_father_name', label: 'مدعا عليه کے والد کا نام' },
  { id: 'husband_caste', label: 'قوم (شوہر)' },
  { id: 'husband_address', label: 'پتہ (شوہر)' },
  { id: 'husband_tehsil', label: 'تحصیل (شوہر)' },
  { id: 'husband_district', label: 'ضلع (شوہر)' },
  { id: 'note_points', label: 'دلائل', type: 'textarea', rows: 10 },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'lawyer_name', label: 'وکیل کا نام' },
  { id: 'lawyer_address', label: 'وکیل کا پتہ' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 18, direction: 'rtl' };

export default function TansikNikah() {
  const renderDocument = (v) => {
    const points = v.note_points ? v.note_points.split('\n').filter(Boolean) : [];
    return (
      <div style={rtlStyle}>
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <p style={{ margin: 0, fontSize: 27 }}>بعدالت جناب <PlaceholderSpan value={v.court_name} /> شہر <PlaceholderSpan value={v.city} /></p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <PlaceholderSpan value={v.accused_name} /> بنت <PlaceholderSpan value={v.father_name} /> قوم <PlaceholderSpan value={v.caste} /> ساکنہ <PlaceholderSpan value={v.address} /> تحصیل <PlaceholderSpan value={v.tehsil} /> ضلع <PlaceholderSpan value={v.district} />
          <span style={{ display: 'block', fontSize: 16 }}>----(مدعيه)</span>
        </div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}><p>بنـام</p></div>
        <div style={{ textAlign: 'center' }}>
          <PlaceholderSpan value={v.husband_name} /> ولد <PlaceholderSpan value={v.husband_father_name} /> قوم <PlaceholderSpan value={v.husband_caste} /> ساکن <PlaceholderSpan value={v.husband_address} /> تحصیل <PlaceholderSpan value={v.husband_tehsil} /> ضلع <PlaceholderSpan value={v.husband_district} />
          <span style={{ display: 'block', fontSize: 16 }}>----(مدعا عليه)</span>
        </div>
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <p style={{ fontSize: 22, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست تنسیخ نکاح</p>
        </div>
        <p style={{ fontSize: 16 }}>جناب عالی! مدعیہ حسبِ ذیل عرض پرداز ہے۔</p>
        <ul style={{ fontSize: 16, listStyle: 'none', paddingRight: 0, minHeight: 100 }}>
          {points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
        <p style={{ fontSize: 16, textAlign: 'center', margin: '20px auto 0', width: '45%', marginRight: '65%' }}>
          حالات بالا کے پیش نظر استدعا ہے کہ مدعیہ کا نکاح تنسیخ کیا جائے۔
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
  return <UrduLegalTemplate slug="tansik-nikah" title="Create Annulment of Marriage Application" fields={fields} renderDocument={renderDocument} />;
}
