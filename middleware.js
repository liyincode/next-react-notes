import {Negotiator} from "negotiator";
import {defaultLocale, locales} from "@/config";
import {match} from "@formatjs/intl-localematcher";

const publicFile = /\.(.*)$/
const excludeFiles = [
    'logo.svg'
]

function getLocale(request) {
    const headers = {'accept-language': request.headers.get('accept-language') || ''};
    const languages = new Negotiator({headers}).languages();

    return match(languages, locales, defaultLocale);
}

export function middleware(request) {
    const {pathname} = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return;
    }

    // Skip public files
    if (publicFile.test(pathname) && !excludeFiles.includes(pathname.substring(1))) {
        return;
    }

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    console.log(1111)
    console.log(locale, pathname)

    return Response.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
