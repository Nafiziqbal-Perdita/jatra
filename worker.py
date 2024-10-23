# worker.py

import requests
from bs4 import BeautifulSoup

def scrape_data():
    # URL of the webpage you want to scrape
    url = 'https://www.daraz.com.bd/'  # Replace with the actual URL

    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses

        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')

        # Example: Find all article titles (adjust the selector based on your target website)
        titles = soup.find_all('h2', class_='article-title')  # Adjust the tag and class as needed

        # Extract the text from each title
        title_list = [title.get_text(strip=True) for title in titles]

        # Return the titles as a JSON-like string
        return {'titles': title_list}

    except requests.exceptions.RequestException as e:
        return f"An error occurred: {str(e)}"

if __name__ == "__main__":
    data = scrape_data()
    print(data)  # Print the result, which will be captured in stdout
