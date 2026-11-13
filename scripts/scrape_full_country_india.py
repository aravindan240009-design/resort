"""
scripts/scrape_full_country_india.py
=============================================================================
ALL-INDIA HIGH-TICKET LEADS SCRAPER (ZERO-WEBSITE FILTER)
Supports both Apify and Outscraper APIs with automatic WhatsApp link generation,
Google Maps reviews extraction, and clean CSV / Excel export.
=============================================================================
"""

import os
import sys
import argparse
import pandas as pd

# ---------------------------------------------------------------------------
# ALL-INDIA HIGH-TICKET SEARCH GRID (Targeting Wealth Pockets)
# ---------------------------------------------------------------------------
ALL_INDIA_HIGH_TICKET_REGIONS = {
    "Tamil Nadu": [
        "luxury villa builders ECR Chennai",
        "architectural firms Poes Garden Boat Club Chennai",
        "luxury home interior designers Anna Nagar Nungambakkam Chennai",
        "beach house contractors ECR Chennai",
        "luxury bungalow architects Race Course Coimbatore",
        "farmhouse builders OMR Chennai",
        "turnkey interior contractors Madurai"
    ],
    "Karnataka": [
        "luxury villa developers Sadashivanagar Bangalore",
        "high end architects Indiranagar Koramangala Bangalore",
        "premium residential contractors Lavelle Road Bangalore",
        "luxury bungalow interior designers Whitefield Bangalore",
        "heritage villa architects Gokulam Jayalakshmipuram Mysuru"
    ],
    "Maharashtra": [
        "luxury penthouse renovation architects Bandra Juhu Mumbai",
        "luxury residential interior designers South Mumbai Worli",
        "bungalow contractors Koregaon Park Kalyani Nagar Pune",
        "luxury villa builders Lonavala Khandala Alibaug",
        "turnkey architectural designers Powai Mumbai"
    ],
    "Telangana & Andhra Pradesh": [
        "ultra luxury villa builders Jubilee Hills Hyderabad",
        "architectural consultants Banjara Hills Hyderabad",
        "luxury farmhouse developers Kokapet Gachibowli Hyderabad",
        "premium interior designers Film Nagar Hyderabad",
        "luxury bungalow contractors Waltair Uplands Visakhapatnam"
    ],
    "Delhi NCR": [
        "luxury farmhouse architects Chhatarpur Vasant Kunj Delhi",
        "high end interior designers Golf Course Road DLF Gurgaon",
        "luxury villa builders Greater Kailash South Ex Delhi",
        "custom home contractors Noida Expressway Sector 44"
    ],
    "Goa & Kerala": [
        "luxury holiday villa builders Assagao Anjuna Goa",
        "boutique resort architects Porvorim Candolim Goa",
        "heritage luxury home builders Panampilly Nagar Kochi",
        "backwater villa contractors Marine Drive Kochi",
        "luxury tropical architects Kozhikode Calicut"
    ],
    "Gujarat & Rajasthan": [
        "luxury bungalow architects Bodakdev SG Highway Ahmedabad",
        "heritage palace style villa contractors Sindhu Bhavan Ahmedabad",
        "luxury haveli architects Civil Lines Jaipur",
        "high end interior designers C Scheme Jaipur"
    ],
    "West Bengal": [
        "luxury residential architects Ballygunge Alipore Kolkata",
        "premium turnkey interior designers Salt Lake New Town Kolkata"
    ]
}

def normalize_whatsapp(phone):
    """Converts local Indian numbers to international https://wa.me/91XXXXXXXXXX links."""
    if not phone or phone == "N/A" or pd.isna(phone):
        return "N/A"
    clean = "".join([c for c in str(phone) if c.isdigit()])
    if len(clean) == 10:
        clean = "91" + clean
    elif len(clean) == 11 and clean.startswith("0"):
        clean = "91" + clean[1:]
    elif len(clean) == 12 and clean.startswith("91"):
        pass
    else:
        return "N/A"
    return f"https://wa.me/{clean}"

def run_apify(token, queries, max_per_query=20, output_csv="india_all_states_leads.csv"):
    """Scrapes Google Maps businesses without websites using Apify."""
    try:
        from apify_client import ApifyClient
    except ImportError:
        print("[!] Missing package: apify-client. Install with: pip install apify-client pandas openpyxl")
        sys.exit(1)

    print(f"[*] Authenticating with Apify API...")
    client = ApifyClient(token)

    run_input = {
        "searchStringsArray": queries,
        "maxCrawledPlacesPerSearch": max_per_query,
        "language": "en",
        "onlyWithoutWebsite": True,  # Key filter: only returns places with NO website!
        "skipClosedPlaces": True,
        "maxImages": 4
    }

    print(f"[*] Launching Apify Google Places Actor across {len(queries)} query targets...")
    run = client.actor("compass/crawler-google-places").call(run_input=run_input)
    print(f"[✓] Scrape complete. Fetching dataset...")

    dataset = client.dataset(run["defaultDatasetId"])
    records = []

    for item in dataset.iterate_items():
        phone = item.get("phone") or item.get("phoneUnformatted") or "N/A"
        wa_link = normalize_whatsapp(phone)
        photos = " | ".join((item.get("imageUrls") or [])[:3]) or "No photos"
        category = item.get("categoryName") or "Luxury Architecture / Construction"
        rating = item.get("totalScore", "N/A")
        reviews = item.get("reviewsCount", 0)

        records.append({
            "Business Name": item.get("title", "N/A"),
            "Category": category,
            "Phone Number": phone,
            "WhatsApp Link": wa_link,
            "Email": item.get("email") or "Search via IG/JustDial",
            "Google Rating": rating,
            "Review Count": reviews,
            "Address": item.get("address", "N/A"),
            "City / Locality": item.get("city", "N/A"),
            "State / Region": item.get("state", "N/A"),
            "Google Maps Link": item.get("url", "N/A"),
            "Top Photos": photos,
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Pitch Angle": f"High Google Maps rating ({rating}★) with stunning real-world photos but NO digital presence. Pitch turnkey interactive portfolio showcase."
        })

    if not records:
        print("[!] No leads found matching strict zero-website criteria. Try broadening search areas.")
        return

    df = pd.DataFrame(records)
    # Deduplicate by business name and phone
    df.drop_duplicates(subset=["Business Name", "Phone Number"], inplace=True)

    # Save CSV
    df.to_csv(output_csv, index=False, encoding="utf-8-sig")
    print(f"[✓] Saved CSV:   {output_csv}")

    # Save Excel copy
    xlsx_path = os.path.splitext(output_csv)[0] + ".xlsx"
    try:
        df.to_excel(xlsx_path, index=False)
        print(f"[✓] Saved Excel: {xlsx_path}")
    except Exception as e:
        pass

    print(f"\n=======================================================")
    print(f" TOTAL QUALIFIED LEADS (NO WEBSITE): {len(df)}")
    print(f"=======================================================")

def main():
    parser = argparse.ArgumentParser(description="All-India High-Ticket Zero-Website Leads Scraper")
    parser.add_argument("--token", help="Apify API Token (or set APIFY_TOKEN env var)")
    parser.add_argument("--state", choices=list(ALL_INDIA_HIGH_TICKET_REGIONS.keys()), help="Target single state only")
    parser.add_argument("--limit", type=int, default=20, help="Max places per search query (default: 20)")
    parser.add_argument("--output", default="india_leads_no_website.csv", help="Output file path (default: india_leads_no_website.csv)")

    args = parser.parse_args()
    token = args.token or os.environ.get("APIFY_TOKEN")

    if not token:
        print("\n" + "="*70)
        print(" [!] ERROR: API Token required to run live scraping.")
        print("="*70)
        print(" Steps to get your free token ($5 free monthly credits):")
        print(" 1. Sign up free at: https://console.apify.com/sign-up")
        print(" 2. Go to: Settings -> Integrations -> Copy 'Personal API Token'")
        print("\n Run in PowerShell:")
        print("   python scripts/scrape_full_country_india.py --token YOUR_TOKEN --state \"Tamil Nadu\"")
        print("   python scripts/scrape_full_country_india.py --token YOUR_TOKEN --output all_india.csv\n")
        sys.exit(1)

    queries = []
    if args.state:
        print(f"[*] Target Scope: {args.state}")
        queries = ALL_INDIA_HIGH_TICKET_REGIONS[args.state]
    else:
        print("[*] Target Scope: Full Country (All 8 Indian Regional Hubs)")
        for st, q_list in ALL_INDIA_HIGH_TICKET_REGIONS.items():
            queries.extend(q_list)

    run_apify(token, queries, max_per_query=args.limit, output_csv=args.output)

if __name__ == "__main__":
    main()
