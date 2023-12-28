import { useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';

export default function PaymentInputs() {
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('')


    return (
        <div className='cardInfo'>
            <input className='ccInput' {...getCardNumberProps({ onChange: (e) => setCardNumber(e.target.value) })} value={cardNumber} />
            <input className='ccInput' {...getExpiryDateProps({ onChange: (e) => setExpiryDate(e.target.value) })} value={expiryDate} />
            <input className='ccInput' {...getCVCProps({ onChange: (e) => setCvc(e.target.value) })} value={cvc} />
            {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
        </div>
    );
}
