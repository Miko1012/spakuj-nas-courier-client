export const getPackages = async() => {
    let url = "https://spakuj-nas.herokuapp.com/courier/dashboard";
    const response = await fetch(url, {method: "GET"});
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error("cos poszlo nie tak");
    }
}