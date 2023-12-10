import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'

const langs = [
    {
        label:"cs",
        value:"cs"
    },
    {
        label:"en",
        value:"en"
    }
]

export default function LanguageSwitcher() {
    const {i18n} = useTranslation()

    const handleLanguageChagne = (e: SelectChangeEvent) => {
        i18n.changeLanguage(e.target.value)
    }
  return (
    <FormControl fullWidth>
  <Select
    value={i18n.language}
    label="Age"
    onChange={handleLanguageChagne}
    className='h-[30px] dark:text-white'
  >
    {langs.map((lang, index) => (
        <MenuItem value={lang.value} key={index} className={"dark:bg-gray-600 text-black dark:text-white"}>{lang.label}</MenuItem>
    ))}
  </Select>
</FormControl>
  )
}
