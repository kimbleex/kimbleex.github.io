var posts=["2020/03/11/1.Hexo_Image_Process/","2021/10/25/2.Github_Commands/","2020/12/09/3.Recommend01_tqdm/","2021/03/18/4.Selenium_Read_UsersInfo/","2024/07/25/5.Python Asyncio异步操作/","2022/08/15/7.AmazonSpider/","2024/08/02/6.Python调用Openai接口实现chatGPT问答/","2024/08/05/8.OpenAI接口实现图片分析/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };