/**
 * Password validator for login supplier
 */
// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return {label: 'Poor', color: '#f44336'};
    if (count < 3) return {label: 'Weak', color: '#ffc107'};
    if (count < 4) return {label: 'Normal', color: '#ffab91'};
    if (count < 5) return {label: 'Good', color: '#00e676'};
    if (count < 6) return {label: 'Strong', color: '#00c853'};
    return {label: 'Poor', color: '#f44336'};
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};

export function formatMobile(mobile) {
    mobile = mobile?.toString();
    if (mobile?.length === 0) {
        mobile = "";
    } else if (mobile?.length <= 3) {
        mobile = mobile?.replace(/^(\d{0,3})/, "($1)");
    } else if (mobile?.length <= 6) {
        mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
    } else if (mobile?.length === 9) {
        mobile = mobile?.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
    } else if (mobile?.length <= 10) {
        mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
    } else if (mobile?.length === 11) {
        mobile = mobile?.replace(
            /^(\d{0,2})(\d{0,2})(\d{0,3})(\d{0,4})/,
            "+$1 ($2) $3 $4"
        );
    }

    return mobile;
}

export function currencyFormat(num, unit, fractionDigits) {
    return unit + num?.toFixed(fractionDigits).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function longTextShow(text, maxLength) {
    return ((text).length > maxLength) ?
        (((text).substring(0, maxLength - 3)) + '...') :
        text;
}


export function getTimeWelcome() {
    const hours = new Date().getHours();

    if (+hours < 12) {
        return "Good Morning!";
    } else if ((+hours > 12 && +hours < 16) || +hours === 12) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    if (name !== " ") {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }
}

export const _setImage = async (src, filename) => {
    try {
        if (src) {
            return await fetch(src)
                .then((r) => r.blob())
                .then(
                    (blobFile) =>
                        new File([blobFile], filename, {type: blobFile.type})
                );
        } else {
            return {};
        }
    } catch (error) {
        console.log(error);
        return {};
    }
};
