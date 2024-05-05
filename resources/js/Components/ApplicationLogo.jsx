export default function ApplicationLogo(props) {
    const {size='sm'}=props;
    return (
        <img src="/images/logo/logo.png" alt="RESTO" className={`${size == 'lg' && 'max-h-32'} ${size == 'md' && 'max-h-16'} ${size == 'sm' && 'max-h-12'}`} />
    );
}
