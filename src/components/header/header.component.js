import { h } from 'preact';
import { Link } from 'preact-router/match';

// import style from './header.style.scss';
import UserWidgetConsumer from './UserWidget.component';

const Header = () => (
	<header className="sans-serif bg-black-80">
		<nav className="dt w-100 mw8 center">
			<div className="dtc w2 v-mid pa3">
				<a href="/" className="div pa1 ba b--white-90 grow-larger no-underline">Beraza</a>
			</div>
			<div className="dtc v-mid tr pa3">
				<Link href="/" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">Home</Link>
				<Link href="/gallery" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">Gallery</Link>
				<Link href="/profile" className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">Me</Link>
				<UserWidgetConsumer />
			</div>
		</nav>
	</header>
);

export default Header;
