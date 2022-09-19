# **_Sergey Timofeev_**

![](cv-logo.jpg)

### Contacts:

- Telegram, WhatsApp: +7(911)7607146
- timofeevbest@yandex.ru
- [Github: SergeyTimofeev1](https://github.com/SergeyTimofeev1)
- Discord: SergeyTimofeev(@SergeyTimofeev1)

### About:

HI, everybody! I am study javaScript and other web development technologies and looking for my dream job.

### Skills:

- HTML/CSS
  - Work from Udemi course: SergeyTimofeev1.github.io
- JS (completed Kata's on Codewars.com) 
    - [Find index of the vowels](https://www.codewars.com/kata/5680781b6b7c2be860000036)
        ```
            function vowelIndices(word){
                let regexp = /[aeyuio]/gi
                let wordArr = word.split('')
                let arrVovel =[]
                    for(i = 0; i < wordArr.length; i++) {
                        if (wordArr[i].match(regexp)) {
                        arrVovel.push(i + 1)
                        }
            }
                return arrVovel
        ```
        `console.log(vowelIndices('Sergey')) // [2,5,6]`
    - [Find highest and lowest number](https://www.codewars.com/kata/554b4ac871d6813a03000035)
        ```
            function highAndLow(n){
                return n.split(' ').sort((a,b) => a - b).pop() + ' ' + n.split(' ').sort((a,b) => a - b)[0] //
            }
        ```
        `console.log(highAndLow('1 2 3 4 5 -5')) // '5 -5'`
    - [Sum of two lowest positive integers](https://www.codewars.com/kata/558fc85d8fd1938afb000014)
        ```
            function sumTwoSmallestNumbers(numbers) {
                let minNum = Math.min(...numbers)
                let sortNumbers = numbers.filter((e) => e > minNum)
                let secondMinNum = Math.min(...sortNumbers)
                return minNum +  secondMinNum
            }
        ```
        `console.log(sumTwoSmallestNumbers([1 , 2, 3, 5])) // 3`
