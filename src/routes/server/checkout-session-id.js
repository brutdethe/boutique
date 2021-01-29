import Stripe from 'stripe'
import 'dotenv/config'

const checkoutData = {
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    locale: '',
    shipping_address_collection: {
        allowed_countries: ['FR', 'US', 'ES', 'IT', 'DE']
    },
    line_items: [],
    mode: 'payment',
    success_url: '',
    cancel_url: ''
}

const dict = {
    shipping: {
        en: "Shipping costs",
        fr: "Frais de transport"
    },
}

function allowedCountries(country) {
    let allowedCountries = []
    switch (country) {
        case 'france':
            allowedCountries = allowedCountries.concat(['FR'])
            break;
        case 'europe':
            allowedCountries = allowedCountries.concat(["AD",
                "BE",
                "BG",
                "HR",
                "AT",
                "CY",
                "DK",
                "ES",
                "RE",
                "GY",
                "GP",
                "MQ",
                "EE",
                "DE",
                "SE",
                "MF",
                "BL",
                "RO",
                "IT",
                "PT",
                "NL",
                "PL",
                "NO",
                "FI",
                "GR",
                "HU",
                "LV",
                "LT",
                "LU",
                "MT",
                "CZ",
                "SK",
                "SI"
            ])
            break;
        case 'international':
            allowedCountries = allowedCountries.concat([
                "AF",
                "DZ",
                "AO",
                "AI",
                "AQ",
                "AG",
                "AR",
                "AM",
                "AW",
                "AU",
                "AZ",
                "BS",
                "BH",
                "BD",
                "BB",
                "BY",
                "BZ",
                "BJ",
                "BM",
                "BT",
                "BO",
                "BQ",
                "BA",
                "BW",
                "BV",
                "BR",
                "IO",
                "BN",
                "BF",
                "BI",
                "CV",
                "KH",
                "CM",
                "CA",
                "KY",
                "CF",
                "TD",
                "CL",
                "CN",
                "CO",
                "KM",
                "CD",
                "CG",
                "CK",
                "CR",
                "CW",
                "CI",
                "DJ",
                "DM",
                "DO",
                "EC",
                "EG",
                "HK",
                "SV",
                "GQ",
                "ER",
                "SZ",
                "ET",
                "FK",
                "FO",
                "FJ",
                "PF",
                "TF",
                "GA",
                "GM",
                "GE",
                "GH",
                "GI",
                "GL",
                "GD",
                "GU",
                "GT",
                "GG",
                "GN",
                "GW",
                "HT",
                "VA",
                "HN",
                "IS",
                "IN",
                "ID",
                "IQ",
                "IE",
                "IM",
                "IL",
                "JM",
                "JP",
                "JE",
                "JO",
                "KZ",
                "KE",
                "KI",
                "KR",
                "KW",
                "KG",
                "LA",
                "LB",
                "LS",
                "LR",
                "LY",
                "LI",
                "MO",
                "MG",
                "MW",
                "MY",
                "MV",
                "ML",
                "MR",
                "MU",
                "YT",
                "MX",
                "MD",
                "MC",
                "MN",
                "ME",
                "MS",
                "MA",
                "MZ",
                "MM",
                "NA",
                "NR",
                "NP",
                "NC",
                "NZ",
                "NI",
                "NE",
                "NG",
                "NU",
                "OM",
                "PK",
                "PS",
                "PA",
                "PG",
                "PY",
                "PE",
                "PH",
                "PN",
                "PR",
                "QA",
                "MK",
                "RU",
                "RW",
                "SH",
                "KN",
                "LC",
                "PM",
                "VC",
                "WS",
                "SM",
                "ST",
                "SA",
                "SN",
                "RS",
                "SC",
                "SL",
                "SG",
                "SX",
                "SB",
                "SO",
                "ZA",
                "GS",
                "SS",
                "LK",
                "SR",
                "SJ",
                "CH",
                "TW",
                "TJ",
                "TZ",
                "TH",
                "TL",
                "TG",
                "TK",
                "TO",
                "TT",
                "TN",
                "TR",
                "TM",
                "TC",
                "TV",
                "UG",
                "UA",
                "AE",
                "GB",
                "US",
                "UY",
                "UZ",
                "VU",
                "VE",
                "VN",
                "VG",
                "WF",
                "EH",
                "YE",
                "ZM",
                "ZW",
                "AX"
            ])
            break;
        default:
            throw 'No country allowed';
    }

    return allowedCountries
}

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json')
    const {
        basket,
        language,
        shipping,
        currency,
        country
    } = req.body;

    const origin = req.headers.origin;
    const stripeKeySk = process.env['stripe_sk']
    const stripe = new Stripe(stripeKeySk)

    async function session() {
        checkoutData.locale = language
        checkoutData.shipping_address_collection.allowed_countries = allowedCountries(country)
        checkoutData.success_url = new URL(`/${language}/panier-ok?session_id={CHECKOUT_SESSION_ID}`, origin).href
        checkoutData.cancel_url = new URL(`/${language}/panier-annule`, origin).href
        checkoutData.line_items = basket.map(item => {
            return {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.titre[language],
                        description: item.id,
                        metadata: {
                            item_id: item.id
                        }
                    },
                    unit_amount: item.prix[currency] * 100,
                },
                quantity: item.qty,
            };
        });
        checkoutData.line_items[checkoutData.line_items.length] = {
            price_data: {
                currency: currency,
                product_data: {
                    name: dict.shipping[language],
                },
                unit_amount: shipping[currency] * 100,
            },
            quantity: 1,
        }
        return stripe.checkout.sessions.create(checkoutData);
    }

    session().then(session => {
        return res.end(JSON.stringify({
            session: {
                id: session.id
            }
        }))
    })
}