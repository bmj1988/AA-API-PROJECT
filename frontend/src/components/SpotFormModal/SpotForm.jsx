import { useState } from 'react'
import './SpotForm.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkCreateSpot } from '../../store/spots'
import SpotModal from '../Main/SpotModal/SpotModal'

const SpotFormModal = () => {
    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(50);
    const [lng, setLng] = useState(50);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [images, setImages] = useState({})
    const [errors, setErrors] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setLng(50);
        setLat(50);
        const newSpot = {
            address,
            description,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            previewImage,

        }
        const res = await dispatch(thunkCreateSpot(newSpot, images))
        if (res.errors) {
            setErrors(res.errors)
            return
        }

        setModalContent(<SpotModal spot={res}/>);

    }

    return (
        <div className='spotFormDiv'>
            <h1 className='spotFormHeader'>Create a New Spot</h1>
            <form onSubmit={onSubmit} className="spotForm">
                <div className='sectionContainer'>
                    <h2>{"Where's your place located?"}</h2>
                    <p>Guests will only get your exact address once they booked a
                        reservation</p>

                    <label htmlFor='country'>Country</label> {errors.country && <p className='errors'>{errors.country}</p>}
                    <input name='country' type='text' placeholder='Country' className={`spotInput`} onChange={(e) => setCountry(e.target.value)} />
                    <label htmlFor='address'>Street Address</label>{errors.address && <p className='errors'>{errors.address}</p>}
                    <input name='address' type='text' placeholder='Address' className={`spotInput`} onChange={(e) => setAddress(e.target.value)} />

                    <div className='location'>
                        <label htmlFor='city'>City</label>
                        {errors.city && <p className='errors'>{errors.city}</p>}
                        <input name='city' type='text' placeholder='City' className={`spotInput`} onChange={(e) => setCity(e.target.value)} />
                        <label htmlFor='state'>State</label>
                        {errors.state && <p className='errors'>{errors.state}</p>}
                        <input name='state' type='text' placeholder='STATE' className={`spotInput`} onChange={(e) => setState(e.target.value)} />
                    </div>
                </div>
                <div className='sectionContainer'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like
                        fast wif or parking, and what you love about the neighborhood.</p>
                    {errors.description && <p className='errors'>{errors.description}</p>}
                    <textarea name='description' rows={8} cols={60} placeholder='Please use at least 30 characters' className={`spotDescription`} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='sectionContainer'>
                    <h2>Create a title for your spot</h2>
                    <p>{`Catch guests' attention with a spot title that highlights what makes
                        your place special.`}</p>
                    {errors.name && <p className='errors'>{errors.name}</p>}
                    <input name='name' type='text' placeholder='Name of your spot' className={`spotInput`} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='sectionContainer'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results.
                    </p>
                    <div className='location'>
                        {errors.price && <p className='errors'>{errors.price}</p>}
                        {'$'}<input name='price' type='number' placeholder='Price per night (USD)' className={`spotInput`} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                </div>
                <div className='sectionContainer'>
                    {errors.previewImage && <p className='errors'>{errors.previewImage}</p>}
                    <input name='previewImage' type='url' placeholder='Preview Image URL' className={`spotInput`} onChange={(e) => setPreviewImage(e.target.value)} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 1: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 2: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 3: e.target.value })} />
                    <input name='image' type='url' placeholder='Image URL' className={`spotInput`} onChange={(e) => setImages({ ...images, 4: e.target.value })} />
                </div>
                <div className='location button'>
                    <button className='spotSend'>Create Spot</button>
                </div>

            </form>
        </div>
    )
}
export default SpotFormModal

{/* {Object.values(errors).length > 0 && Object.values(errors).map(error => <p className={'errors'} key={error}>{error}</p>)} */ }
