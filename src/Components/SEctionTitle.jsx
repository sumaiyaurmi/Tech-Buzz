const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className=' text-center my-8 mx-auto'>
            
<h2 className='uppercase text-2xl md:text-4xl  p-3'>{heading}</h2>
<p className='text-yellow-600 mb-4'>------- {subHeading} -------</p>
        </div>
    );
};

export default SectionTitle;