import requests
from bs4 import BeautifulSoup

url = "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274"


def get_information(url):
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.find('h1').text
    author = soup.find('meta', {'name': 'author'})['content']
    date = soup.find('span', {'data-testid': 'storyPublishDate'}).text
    content_divs = soup.find_all('div', class_='gn go gp gq gr')
    content = ' '.join([div.text for div in content_divs])

    article_data = {
        "title": title,
        "author": author,
        "date": date,
        "content": content
    }
    return article_data


def save_dict_to_txt(file_name, dictionary):
    with open(file_name, 'w') as file:
        file.write(str(dictionary))
    print(f"Dictionary saved to {file_name}")


# Example usage
file_name = "output.txt"
save_dict_to_txt(file_name, get_information(url))