"""
Automated Google Maps Lead Scraper (No-Website Targets -> Excel)
Extracts businesses without a website, their phone numbers, Google Maps URLs, photos, and ratings,
and exports everything into a beautifully formatted Excel and CSV file.
"""

import os
import sys
import argparse
from datetime import datetime
import pandas as pd

def generate_sample_leads():
    """Generates realistic sample leads for immediate testing without an API key."""
    return [
        {
            "Company Name": "Marbella Luxe Living Developments",
            "Category": "Real Estate Developer",
            "Phone Number": "+34 951 123 456",
            "Email": "info@marbellaluxeliving.es (Extracted via IG)",
            "Google Maps URL": "https://maps.google.com/?cid=10293847561029384",
            "Top Photos": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c | https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            "Address": "Calle Camilo José Cela, 12",
            "City": "Marbella",
            "Country": "Spain",
            "Rating": 4.9,
            "Reviews": 18,
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Redesign Pitch Angle": "Pitch an interactive off-plan villa catalog with 3D floor plans and day/night lighting switcher."
        },
        {
            "Company Name": "Estepona Boutique Villas Group",
            "Category": "Custom Home Builder / Architect",
            "Phone Number": "+34 952 789 012",
            "Email": "N/A - Direct Call / WhatsApp Required",
            "Google Maps URL": "https://maps.google.com/?cid=98765432109876543",
            "Top Photos": "https://images.unsplash.com/photo-1613977257363-707ba9348227 | https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
            "Address": "Avenida Litoral, Edif. Bahia",
            "City": "Estepona",
            "Country": "Spain",
            "Rating": 4.7,
            "Reviews": 12,
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Redesign Pitch Angle": "They have 4 completed luxury builds on Google Maps. Needs a digital portfolio to capture foreign buyers."
        },
        {
            "Company Name": "Golden Mile Architectural Craftsmen",
            "Category": "Architectural Designer & Renovation",
            "Phone Number": "+34 951 888 999",
            "Email": "goldenmilecraft@gmail.com",
            "Google Maps URL": "https://maps.google.com/?cid=56473829102938475",
            "Top Photos": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c | https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
            "Address": "Bulevar Príncipe Alfonso de Hohenlohe",
            "City": "Marbella",
            "Country": "Spain",
            "Rating": 5.0,
            "Reviews": 9,
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Redesign Pitch Angle": "High ratings, no website. Offer turnkey brand identity and interactive project portfolio showcase."
        },
        {
            "Company Name": "Palm Cove Private Residences",
            "Category": "Boutique Resort & Villas",
            "Phone Number": "+971 4 234 5678",
            "Email": "reservations.palmcove@outlook.com",
            "Google Maps URL": "https://maps.google.com/?cid=12312312312312312",
            "Top Photos": "https://images.unsplash.com/photo-1540555700478-4be289fbecef | https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
            "Address": "Palm Jumeirah Crescent",
            "City": "Dubai",
            "Country": "United Arab Emirates",
            "Rating": 4.8,
            "Reviews": 34,
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Redesign Pitch Angle": "Only using WhatsApp bookings on Google Maps. Needs a luxury direct-booking landing page with amenity drawers."
        },
        {
            "Company Name": "Limassol Horizon Homes",
            "Category": "Property Developer",
            "Phone Number": "+357 25 112 233",
            "Email": "N/A - Direct Call Required",
            "Google Maps URL": "https://maps.google.com/?cid=87654321098765432",
            "Top Photos": "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b | https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "Address": "28th October Avenue",
            "City": "Limassol",
            "Country": "Cyprus",
            "Rating": 4.6,
            "Reviews": 15,
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Redesign Pitch Angle": "Pitch modern Mediterranean residential template with unit floorplans and currency converter."
        }
    ]

def save_to_excel(leads, output_path):
    """Saves leads list to an Excel spreadsheet with clean styling and auto-adjusted columns."""
    df = pd.DataFrame(leads)
    
    # Write to Excel with openpyxl
    with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="Leads Without Website", index=False)
        worksheet = writer.sheets["Leads Without Website"]
        
        # Style header row
        from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
        header_fill = PatternFill(start_color="17233B", end_color="17233B", fill_type="solid")
        header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        thin_border = Border(
            left=Side(style='thin', color='DDDDDD'),
            right=Side(style='thin', color='DDDDDD'),
            top=Side(style='thin', color='DDDDDD'),
            bottom=Side(style='thin', color='DDDDDD')
        )
        
        for col_idx, col in enumerate(worksheet.iter_cols(min_row=1, max_row=1), start=1):
            cell = col[0]
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
            
        # Format data rows & adjust column width
        for col in worksheet.columns:
            max_len = 0
            col_letter = col[0].column_letter
            for cell in col:
                cell.border = thin_border
                cell.alignment = Alignment(vertical="center")
                val_str = str(cell.value or "")
                if len(val_str) > max_len:
                    max_len = len(val_str)
            worksheet.column_dimensions[col_letter].width = min(max(max_len + 3, 12), 45)

    # Also save CSV copy for instant viewing
    csv_path = os.path.splitext(output_path)[0] + ".csv"
    df.to_csv(csv_path, index=False, encoding="utf-8-sig")
    print(f"[✓] Saved formatted Excel: {output_path}")
    print(f"[✓] Saved CSV copy:       {csv_path}")

def run_apify_scraper(token, search_queries, max_places, output_path):
    """Executes live scrape against Apify's Google Maps Crawler."""
    try:
        from apify_client import ApifyClient
    except ImportError:
        print("[!] apify-client is not installed. Run: pip install apify-client")
        sys.exit(1)

    print(f"[*] Initializing Apify client with token...")
    client = ApifyClient(token)

    run_input = {
        "searchStringsArray": search_queries,
        "maxCrawledPlacesPerSearch": max_places,
        "language": "en",
        "onlyWithoutWebsite": True,  # Key filter: only targets without websites!
        "maxImages": 5,              # Fetch photo links
        "includeReviews": False,
        "skipClosedPlaces": True,
    }

    print(f"[*] Starting Apify Google Maps actor ('compass/crawler-google-places')...")
    print(f"[*] Target Queries: {search_queries}")
    print(f"[*] Filter: onlyWithoutWebsite = True")
    
    run = client.actor("compass/crawler-google-places").call(run_input=run_input)
    print(f"[✓] Actor finished. Fetching dataset {run['defaultDatasetId']}...")

    leads = []
    dataset = client.dataset(run["defaultDatasetId"])
    for item in dataset.iterate_items():
        images = item.get("imageUrls", []) or []
        photo_links = " | ".join(images[:4]) if images else "No photos available"
        
        category = item.get("categoryName") or item.get("categories", ["Business"])[0] if item.get("categories") else "Business"
        phone = item.get("phone") or item.get("phoneUnformatted") or "N/A"
        
        leads.append({
            "Company Name": item.get("title", "N/A"),
            "Category": category,
            "Phone Number": phone,
            "Email": item.get("email") or "Search via Instagram/Facebook",
            "Google Maps URL": item.get("url", "N/A"),
            "Top Photos": photo_links,
            "Address": item.get("address", "N/A"),
            "City": item.get("city", "N/A"),
            "Country": item.get("countryCode", "N/A"),
            "Rating": item.get("totalScore", "N/A"),
            "Reviews": item.get("reviewsCount", 0),
            "Website Status": "NO WEBSITE (High Priority Lead)",
            "Redesign Pitch Angle": f"Pitch custom interactive web portfolio for their {category} projects."
        })

    if not leads:
        print("[!] No leads found matching the exact criteria. Try broadening search queries.")
        return

    print(f"[✓] Extracted {len(leads)} leads without websites.")
    save_to_excel(leads, output_path)

def main():
    parser = argparse.ArgumentParser(description="Scrape Google Maps businesses without a website to Excel")
    parser.add_argument("--token", help="Apify API token (or set APIFY_TOKEN env var)")
    parser.add_argument("--queries", nargs="+", default=[
        "Luxury real estate developer in Marbella",
        "Boutique architects in Marbella",
        "Custom home builder in Estepona"
    ], help="List of Google Maps search queries")
    parser.add_argument("--limit", type=int, default=20, help="Max places per search query")
    parser.add_argument("--output", default="leads_without_websites.xlsx", help="Output Excel filename")
    parser.add_argument("--demo", action="store_true", help="Generate sample qualified leads immediately")

    args = parser.parse_args()

    token = args.token or os.environ.get("APIFY_TOKEN")

    if args.demo or not token:
        if not args.demo and not token:
            print("[!] Notice: No Apify API token provided via --token or APIFY_TOKEN env variable.")
            print("[*] Generating demonstration dataset of qualified targets to verify Excel layout...")
            print("[*] To run live scraping, simply get a free token at apify.com and run:")
            print("    python scripts/scrape_leads.py --token YOUR_APIFY_TOKEN\n")
        
        sample_leads = generate_sample_leads()
        save_to_excel(sample_leads, args.output)
        return

    run_apify_scraper(token, args.queries, args.limit, args.output)

if __name__ == "__main__":
    main()
