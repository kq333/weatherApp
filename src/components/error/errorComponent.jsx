import errorImg from '../../assets/error.webp';
import '../error/errorComponent.scss';

export const ErrorComponent = () => {
  return (
    <div className='error'>
      <img className='error__img' src={errorImg} alt='error image' />
    </div>
  );
};
