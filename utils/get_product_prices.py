import requests

def fetch_prices():
    base_url = "https://hoff.is/store2/api/v1/price/"
    
    for product_id in range(1, 11):  # loopar från 1 till 10
        url = f"{base_url}{product_id}"
        try:
            response = requests.get(url)
            response.raise_for_status()  # kastar fel om status != 200
            data = response.json()
            
            print(f"Product ID {product_id}:")
            print(data)
            print("-" * 40)
        except requests.exceptions.RequestException as e:
            print(f"Error fetching product {product_id}: {e}")

if __name__ == "__main__":
    fetch_prices()
