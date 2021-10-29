
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<div align="center">
 <img src="frontend/gui/public/artificial-logo.ico" alt="Logo" width="80" height="80"/>
 <h2 align="center"> GeThaTexT - Free OCR Website</h2>
 
</div>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul> 
  </ol>
</details>

## About The Project

GeThaTexT is a website that offer a free OCR (Optical Character Recognition) to anyone
User must authenticate (registering to email & password) or via Facebook/Google login
And then can upload an image (must be under 2MB size) and get the text hidden in the image!

## Example of Usage:
* Home Page
![Screen Shot 2021-10-28 at 18 19 20](https://user-images.githubusercontent.com/21170255/139415149-b2d44208-1782-48d9-990c-bea2ef4f20bd.png)

After authenticating you can upload you image.
- Image for example
<img width="710" alt="Screen Shot 2021-10-28 at 22 24 47" src="https://user-images.githubusercontent.com/21170255/139415420-0c4ef9d6-544c-41fe-8aca-86e66f3b76fb.png">

* Now, uploading it to the website (https://gethatext.com/upload/)
<img width="1102" alt="Screen Shot 2021-10-28 at 22 26 24" src="https://user-images.githubusercontent.com/21170255/139415638-546ce3fb-c364-415a-a1b2-f91acecceec0.png">

NOTE: after the upload is finished, you will be need to click on the green eye Icon <img src="frontend/gui/public/artificial-logo.ico" alt="Logo" width="10" height="10"/>
ENJOY!

## Built With
### Front End
* [React.js](https://reactjs.org/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Redux](https://redux.js.org/)
* [Ant Design](https://ant.design/)
### Back End
* [DJnago](https://www.djangoproject.com/)
* [DJango-RestFrameWork](https://django-rest-framework.org/)
* [SQLite](https://www.sqlite.org/docs.html)
* [Tesseract](https://github.com/tesseract-ocr/tesseract)
* [Python 3](https://docs.python.org/3/)


## Getting Started

### Prerequisites
Node.js
* npm
  ```sh
  npm install npm@latest -g
  ```
* Python 3
  - [Download Python](https://www.python.org/downloads/)
  
  
  
### Installation

- There are dependencies that need to be downloaded for both Frontend & Backend


1. Clone Repo
```sh
   git clone https://github.com/BenK93/GeThaText.git
```

### Frontend Installation
   1. ```sh cd frontend/gui ```
   2. ```sh npm i ```
   3. ```sh npm start (to run on localhost) ```
   
### Backend Installation
   1. ```sh cd backend/src```
   2. ```sh pipenv shell (creating virtual environment) ```
   3. ```sh pipenv install -r requirements.txt ```
   - if all dependencies downloaded succesfully run:
   4. ```sh python manage.py runserver (to run on localhost ) ```


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BenK93/GeThaText.svg?style=for-the-badge
[forks-url]: https://github.com/BenK93/GeThaText/network/members
[stars-shield]: https://img.shields.io/github/stars/BenK93/GeThaText.svg?style=for-the-badge
[stars-url]: https://github.com/BenK93/GeThaText/stargazers
[issues-shield]: https://img.shields.io/github/issues/BenK93/GeThaText.svg?style=for-the-badge
[issues-url]: https://github.com/BenK93/GeThaText/issues
[license-shield]: https://img.shields.io/github/license/BenK93/GeThaText.svg?style=for-the-badge
[license-url]: https://github.com/BenK93/GeThaText/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ben-koren-kruiger
[product-screenshot]: images/screenshot.png
