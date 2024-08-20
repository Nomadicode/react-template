'use client'
import { BaseSyntheticEvent, SyntheticEvent, useEffect } from "react"

import { useAppStateContext } from "@/components/contexts/AppStateContext"
import styles from "./LocaleChanger.module.scss"


export default function LocaleChanger() {
    const year = new Date().getFullYear()

    const { availableLocales, locale, setLocale } = useAppStateContext()

    const localeOptions = Object.keys(availableLocales).map((l: string) => (
        <option key={`locale-${l}`} value={l}>{availableLocales[l]}</option>
    ))

    useEffect(() => {
        console.log(locale)
    }, [locale])

    const updateLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const localeKey = event.target.value
        setLocale(localeKey)
    }

	return (
		<div className={styles['locale-changer']}>
            <label>
                <i className="icon icon-translation"></i>
                <select className={styles['locale-changer__select']} onChange={updateLocale}>
                    {localeOptions}
                </select>
            </label>
        </div>
	)
}
