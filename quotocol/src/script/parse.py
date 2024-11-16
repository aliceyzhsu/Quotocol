import sys
import json
import requests
from bs4 import BeautifulSoup

def get_information(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.text, 'html.parser')

        title = soup.find('h1').text.strip()
        author = soup.find('meta', {'name': 'author'})['content']
        date = soup.find('span', {'data-testid': 'storyPublishDate'}).text.strip()
        content_divs = soup.find_all('div', class_='gn go gp gq gr')
        content = ' '.join([div.text.strip() for div in content_divs])
        platform = "Medium"

        article_data = {
            "title": title,
            "author": author,
            "date": date,
            "content": content,
            "platform": platform
        }
        return article_data
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No URL provided"}))
    else:
        url = sys.argv[1]
        result = get_information(url)
        print(json.dumps(result))  # Print as JSON string
