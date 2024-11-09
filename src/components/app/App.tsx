import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

import { defaultArticleState } from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { Article } from '../article/Article';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [settings, setSettings] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamily,
					'--font-size': settings.fontSize,
					'--font-color': settings.fontColor,
					'--bg-color': settings.backgroundColor,
					'--container-width': settings.contentWidth,
				} as CSSProperties
			}>
			<ArticleParamsForm onApplySettings={setSettings} />
			<Article />
		</main>
	);
};
