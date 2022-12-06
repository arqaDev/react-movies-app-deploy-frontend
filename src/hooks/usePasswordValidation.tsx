import { useState, useEffect } from "react"
import { IPassword, IValid } from "../interfaces/interfaces"


export const usePasswordValidation = ({ firstPassword = "", secondPassword = "", requiredLength=8 }: IPassword): IValid[] => {
const [validLength, setValidLength] = useState<boolean>(false);
const [hasNumber, setHasNumber] = useState<boolean>(false);
const [upperCase, setUpperCase] = useState<boolean>(false);
const [lowerCase, setLowerCase] = useState<boolean>(false);
const [specialChar, setSpecialChar] = useState<boolean>(false);
const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    setValidLength(firstPassword.length >= 8)
    setUpperCase(firstPassword.toLowerCase() !== firstPassword)
    setLowerCase(firstPassword.toUpperCase() !== firstPassword)
    setHasNumber(/\d/.test(firstPassword))
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword))
    setMatch(firstPassword && firstPassword === secondPassword ? true : false)
  }, [firstPassword, secondPassword])

  return [
    {title: "Consists of 8 characters", isValid: validLength},
    {title: "Has number", isValid: hasNumber},
    {title: "Has uppercase letter", isValid: upperCase},
    {title: "Has lowercase letter", isValid: lowerCase},
    {title: "Has special characters", isValid: specialChar},
    {title: "matches", isValid: match}
  ]
}

