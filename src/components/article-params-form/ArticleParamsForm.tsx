import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApplySettings: (settings: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => void;
}

export const ArticleParamsForm = ({
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [stateFont, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [stateFontSize, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [stateFontColor, setFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [stateBackColor, setBackColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [stateContentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const [isAsideOpen, setAsideOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	const handleArrowClick = () => {
		setAsideOpen(!isAsideOpen);
	};

	function handleSaveSubmit(e: SyntheticEvent) {
		e.preventDefault();
		onApplySettings({
			fontFamily: stateFont.value,
			fontSize: stateFontSize.value,
			fontColor: stateFontColor.value,
			backgroundColor: stateBackColor.value,
			contentWidth: stateContentWidth.value,
		});
	}

	function handleReset() {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onApplySettings({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setAsideOpen(false);
		}
	};

	useEffect(() => {
		if (isAsideOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isAsideOpen]);

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={handleArrowClick} />
			<aside
				ref={asideRef}
				className={`${styles.container} ${
					isAsideOpen && styles.container_open
				}`}>
				<form className={styles.form} onSubmit={handleSaveSubmit}>
					<Text as={'h1'} weight={800} size={31} uppercase={true}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='шрифт'
						selected={stateFont}
						options={fontFamilyOptions}
						onChange={(selected) => setFont(selected)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font'
						selected={stateFontSize}
						options={fontSizeOptions}
						onChange={(selected) => setFontSize(selected)}
					/>
					<Select
						title='цвет шрифта'
						selected={stateFontColor}
						options={fontColors}
						onChange={(selected) => setFontColor(selected)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={stateBackColor}
						options={backgroundColors}
						onChange={(selected) => setBackColor(selected)}
					/>
					<Select
						title='ширина контента'
						selected={stateContentWidth}
						options={contentWidthArr}
						onChange={(selected) => setContentWidth(selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
