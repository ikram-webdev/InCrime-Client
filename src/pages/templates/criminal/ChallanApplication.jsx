import React from 'react';
import UrduLegalTemplate, { PlaceholderSpan } from '../../../components/UrduLegalTemplate';

const fields = [
  { id: 'judge_name', label: 'جج کا نام' },
  { id: 'police_station', label: 'تھانہ' },
  { id: 'accused_name', label: 'ملزم کا نام' },
  { id: 'case_no', label: 'مقدمہ نمبر' },
  { id: 'case_date', label: 'مورخہ', type: 'date' },
  { id: 'crime', label: 'بجرم' },
  { id: 'lawyer_name', label: 'وکیل کا نام' },
  { id: 'lawyer_address', label: 'وکیل کا پتہ' },
];

const rtlStyle = { fontFamily: "'Jameel Noori Nastaleeq', Arial, sans-serif", lineHeight: 1.6, fontSize: 18, direction: 'rtl' };

export default function ChallanApplication() {
  const renderDocument = (v) => (
    <div style={rtlStyle}>
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <p style={{ margin: 0, fontSize: 27 }}>
          بعدالت جناب <PlaceholderSpan value={v.judge_name} /> تھانہ <PlaceholderSpan value={v.police_station} />
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PlaceholderSpan value={v.accused_name} />
        <span style={{ display: 'block', fontSize: 16 }}>----(سائل / ملزم)</span>
      </div>
      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}><p>بنـام</p><p>سـرکار</p></div>
      <div style={{ textAlign: 'center', margin: '15px 0' }}>
        <span style={{ fontSize: 20, fontWeight: 'bold', textDecoration: 'underline' }}>
          مقدمہ نمبر <PlaceholderSpan value={v.case_no} /> مورخہ <PlaceholderSpan value={v.case_date} /> بجرم <PlaceholderSpan value={v.crime} />
        </span>
      </div>
      <div style={{ textAlign: 'center', margin: '15px 0' }}>
        <p style={{ fontSize: 22, fontWeight: 'bold', textDecoration: 'underline' }}>درخواست چالان</p>
      </div>
      <p style={{ fontSize: 16 }}>جناب عالی! سائل حسبِ ذیل عرض پرداز ہے کہ مذکورہ بالا مقدمہ میں چالان ابھی تک پیش نہیں کیا گیا۔ مہربانی فرما کر چالان پیش کرنے کا حکم صادر فرمایا جائے۔</p>
      <div style={{ fontSize: 16, marginTop: 20, marginRight: '75%' }}>
        <p>مورخہ <PlaceholderSpan value={v.case_date} /></p>
        <p style={{ fontWeight: 'bold' }}>عرضے</p>
        <p>بذریعہ کونسل</p>
        <span style={{ fontWeight: 'bold', fontSize: 18 }}><PlaceholderSpan value={v.lawyer_name} /></span><br />
        <span>ایڈووکیٹ ہائیکورٹ</span><br />
        <span><PlaceholderSpan value={v.lawyer_address} /></span>
      </div>
    </div>
  );
  return <UrduLegalTemplate slug="challan" title="Create Challan Application" fields={fields} renderDocument={renderDocument} />;
}
