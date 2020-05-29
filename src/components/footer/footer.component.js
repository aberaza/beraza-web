import {h} from 'preact';
import { Link } from 'preact-router/match';

export default function Footer() {
  return (
    <footer class="w-100 bg-near-black pv2 ph3">
      <ul class="center dib list">
        <li class="dib-ns ma2 mb3 mb2-l"><Link href="/" class="hover-white no-underline white-70"> Home </Link></li>
        <li class="dib-ns ma2 mb3 mb2-l"><Link href="/resume" class="hover-white no-underline white-70"> Me </Link></li>
      </ul>
    </footer>
  );
}
