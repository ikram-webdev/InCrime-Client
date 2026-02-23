import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'court_name', label: 'عہدہ' },
  { id: 'area', label: 'علاقہ' },
  { id: 'tehsil', label: 'تحصیل' },
  { id: 'district', label: 'ضلع' },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'accused_name', label: 'نام' },
  { id: 'father_name', label: 'والد کا نام' },
  { id: 'qoum', label: 'قوم' },
  { id: 'address', label: 'پتہ' },
  { id: 'wife_name', label: 'بیوی کا نام' },
  { id: 'wife_father', label: 'بیوی کے والد کا نام' },
  { id: 'wife_qoum', label: 'بیوی کی قوم' },
  { id: 'wife_address', label: 'بیوی کا پتہ' },
  { id: 'reason', label: 'دوسری شادی کی وجہ', type: 'textarea', rows: 8 },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 18, direction: 'rtl' };

export default function SecondMarriage() {
  const renderDocument = (v) => (
    <div style={rtlStyle}>
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <p style={{ margin: 0, fontSize: 27 }}>
          بعدالت <PlaceholderSpan value={v.court_name} /> علاقہ <PlaceholderSpan value={v.area} /> تحصیل <PlaceholderSpan value={v.tehsil} /> ضلع <PlaceholderSpan value={v.district} />
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PlaceholderSpan value={v.accused_name} /> ولد <PlaceholderSpan value={v.father_name} /> قوم <PlaceholderSpan value={v.qoum} /> ساکن <PlaceholderSpan value={v.address} />
        <span style={{ display: 'block', fontSize: 16 }}>----(درخواست گزار)</span>
      </div>
      <div style={{ textAlign: 'center', margin: '15px 0' }}>
        <p style={{ fontSize: 22, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست اجازت دوسری شادی</p>
      </div>
      <div style={{ fontSize: 16, marginBottom: 15 }}>
        <p>موجودہ بیوی: <PlaceholderSpan value={v.wife_name} /> بنت <PlaceholderSpan value={v.wife_father} /> قوم <PlaceholderSpan value={v.wife_qoum} /> ساکنہ <PlaceholderSpan value={v.wife_address} /></p>
      </div>
      <p style={{ fontSize: 16 }}>جناب عالی! درخواست گزار حسبِ ذیل عرض پرداز ہے کہ دوسری شادی کی اجازت دی جائے۔</p>
      {v.reason && <p style={{ fontSize: 16, whiteSpace: 'pre-line' }}>{v.reason}</p>}
      <p style={{ fontSize: 16, textAlign: 'center', margin: '20px auto 0', width: '45%', marginRight: '65%' }}>
        حالات بالا کے پیش نظر استدعا ہے کہ دوسری شادی کی اجازت دی جائے۔
      </p>
      <div style={{ fontSize: 16, marginTop: 20, marginRight: '75%' }}>
        <p>مورخہ <PlaceholderSpan value={v.case_date} /></p>
        <p><PlaceholderSpan value={v.accused_name} /></p>
      </div>
    </div>
  );
  return <UrduLegalTemplate slug="second-marriage" title="Create Second Marriage Application" fields={fields} renderDocument={renderDocument} />;
}
