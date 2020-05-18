import { h } from 'preact';
import { Link } from 'preact-router/match';

// import style from './header.style.scss';
import UserWidgetConsumer from './UserWidget.component';

const Header = () => (
	<header class="sans-serif bg-black-80 fixed w-100 z-999">
		<nav class="dt w-100 mw8 center">
			<div class="dtc w2 v-mid pa3">
				<a href="/" class="div pa1 f3 fw4 tracked white-90 grow-larger no-underline">@Beraza</a>
			</div>
			<div class="dtc v-mid tr pa3">
				<Link href="/" class="f5 fw5 hover-white no-underline white-70 dn dib-ns pv2 ph3">Home</Link>
				<Link href="/gallery" class="f5 fw5 hover-white no-underline white-70 dn dib-ns pv2 ph3">Gallery</Link>
				<Link href="/profile" class="f5 fw5 hover-white no-underline white-70 dn dib-ns pv2 ph3">Me</Link>
				<UserWidgetConsumer />
			</div>
		</nav>
	</header>
);

export default Header;
