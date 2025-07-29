var posts=["Programming/AmazonSpider/","School/Arch-GPU/","Programming/Corn/","Tools/Follow/","Programming/Git-Usage/","Programming/Go-Install-Problem/","School/Arch-Open/","Programming/Hexo-Image-Process/","Programming/JS-LocalFileScan/","Programming/K-Means/","Programming/K-Means-Elbow/","Programming/OpenAI-Image-Process/","Programming/Prisma-Docker-PostgreSQL/","Programming/Python-AsyncIO/","Programming/Python-Schedule/","Programming/OpenAI-Chat/","Programming/Selenium-Headless/","Programming/Selenium-Read-UsersInfo/","Programming/Tqdm/","Tools/Vercel_Directory_Listing/","Tools/Windows-Office-Activate/","Programming/LocalHost-IP/","School/Useful-SQL/","Programming/AVIF-Pillow/","School/Turtle-Bingdundun/","Tools/Python-PyPI/","Programming/Swarm-Intelligence-optimization-Algorithm/","Programming/CycleGANV2/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"Kimbleex","link":"https://xujunliang666.com/","avatar":"https://images.kimbleex.top/THEME/anzhiyu/MainWebPage/Avatar.avif","descr":"丢掉幻想，准备斗争","siteshot":"https://images.kimbleex.top/THEME/anzhiyu/Link/Rec/Kimbleex/BC.png","color":"vip","tag":"技术"},{"name":"Tristan","link":"https://blog.csdn.net/qq_51065387/article/details/128984426","avatar":"https://images.kimbleex.top/THEME/anzhiyu/Link/Friends/Tristan.png","descr":"金融领域马尔可夫模型实际运用","siteshot":"https://images.kimbleex.top/THEME/anzhiyu/Link/Rec/Tristan/BG.png","color":"vip","tag":"技术"},{"name":"Kimbleex","link":"https://xujunliang666.com/","avatar":"https://images.kimbleex.top/THEME/anzhiyu/MainWebPage/Avatar.avif","descr":"放弃幻想，准备斗争","recommend":false,"tag":"这就是我"},{"name":"Tristan","link":"https://blog.csdn.net/qq_51065387?type=blog","avatar":"https://images.kimbleex.top/THEME/anzhiyu/Link/Friends/Tristan.png","descr":"大骏骏我的宝贝😍❤","recommend":false,"tag":"❤"},{"name":"杨秋逸","link":"https://yangqiuyi.com","avatar":"https://avatars.githubusercontent.com/u/62047803","descr":"TO BE A GEEK :-)","recommend":false,"tag":"老前端"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };