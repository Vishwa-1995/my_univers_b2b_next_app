import React from 'react'
import PropTypes from 'prop-types'
import countries from './countries.json'

const CountrySelect = (props: any) => {
    const {option, ...rest} = props
    return <select
        className="w-[588px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-[#707070] text-sm font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]" {...rest}>{countries.map(country => option(country))}</select>
}

CountrySelect.propTypes = {
    /** render prop for <option>. Called with: {cca2, flag, name, code} */
    option: PropTypes.func,
}

CountrySelect.defaultProps = {
    option: ({cca2, flag, name}: any) => (
        <option value={cca2} key={cca2}>
            {`${flag} ${name}`}
        </option>
    ),
}

export default CountrySelect