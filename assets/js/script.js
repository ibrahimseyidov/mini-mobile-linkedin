$("#postBtn").on("click", () => {
    $(".first-sec").hide(300);
    $(".second-sec").show(600)
})

$("#xBtn").on("click", () => {
    $(".second-sec").hide(600);
    $(".first-sec").show(300);
})


$("#xbtn").on("click", () => {
    $(".third-sec").hide(600);
    $(".first-sec").show(300);
})

document.addEventListener("DOMContentLoaded", () => {

    var circle;

    $(document).ajaxStart(function () {
        circle = new ProgressBar.Circle('#circle-progress', {
            color: '#FCB03C',
            strokeWidth: 4,
            trailWidth: 1,
            duration: 2000,
            easing: 'easeInOut',
        });
        circle.animate(1);
    });


    $(document).ajaxStop(function () {
        if (circle) {
            circle.animate(0, function () {
                circle.destroy();
            });
        }
    });

    var settings = {
        "url": "https://blog-api-t6u0.onrender.com/posts",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },

    };


    $.ajax(settings).done(function (response) {
        response.map((post) => {
            $(".main-container").append(() => {
                return `<div class="my-post" data-id="${post.id}">
                <div class="post-head">
                    <div class="post-left">
                        <div>
                            <img src="./assets/img/profile.png">
                        </div>
                        <div class="profile-desc">
                            <span>Nurlan Quliyev &#8226; <span>1 st</span></span>
                            <span>Front End Developer</span>
                            <span>16h &#8226; <img src="./assets/img/vector.svg"></span>
                        </div>
                    </div>
                    <div class="dot">
                        <button class="edit">
                            <img src="./assets/img/dot.svg">
                        </button>
                        <button  class="delBtn">
                            <img src="./assets/img/xbtn.svg">
                        </button>
                     </div>

                </div>
                <div class="content">
                    <p>
                        ${post["title"]} </br></br>
                        ${post["body"]}
                    </p>
                </div>
                <div class="like-comment">
                    <div class="likes">
                        <img src="./assets/img/likes.svg">
                    </div>
                    <div>
                        <span>11 comments</span>
                    </div>
                </div>
                <div class="post-footer">
                    <div class="like">
                        <img src="./assets/img/likeBtn.svg">
                        <span>Like</span>
                    </div>
                    <div class="comment">
                        <img src="./assets/img/commentBtn.svg">
                        <span>Comment</span>
                    </div>
                    <div class="share">
                        <img src="./assets/img/shareBtn.svg">
                        <span>Share</span>
                    </div>
                    <div class="send">
                        <img src="./assets/img/sendBtn.svg">
                        <span>Send</span>
                    </div>
                </div>
            </div>`
            })
        })
    });

})



$(".post-btn").on("click", () => {
    let myPostValue = $("#textArea").val();
    var settings = {
        "url": "https://blog-api-t6u0.onrender.com/posts",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "title": "Linkedin Post:",
            "body": `${myPostValue}`
        }),
    };

    $.ajax(settings).done(function (response) {

        $(".main-container").append(() => {
            return `<div class="my-post" data-id="${response.id}">
            <div class="post-head">
                    <div class="post-left">
                        <div>
                            <img src="./assets/img/profile.png">
                        </div>
                        <div class="profile-desc">
                            <span>Nurlan Quliyev &#8226; <span>1 st</span></span>
                            <span>Front End Developer</span>
                            <span>16h &#8226; <img src="./assets/img/vector.svg"></span>
                        </div>
                    </div>
                    <div class="dot">
                        <button class="edit">
                            <img src="./assets/img/dot.svg">
                        </button>
                        <button class="delBtn">
                            <img src="./assets/img/xbtn.svg">
                        </button>
                     </div>
                </div>
            <div class="content">
                <p>
                  ${response.body}
                </p>
            </div>
            <div class="like-comment">
                <div class="likes">
                    <img src="./assets/img/likes.svg">
                </div>
                <div>
                    <span>11 comments</span>
                </div>
            </div>
            <div class="post-footer">
                <div class="like">
                    <img src="./assets/img/likeBtn.svg">
                    <span>Like</span>
                </div>
                <div class="comment">
                    <img src="./assets/img/commentBtn.svg">
                    <span>Comment</span>
                </div>
                <div class="share">
                    <img src="./assets/img/shareBtn.svg">
                    <span>Share</span>
                </div>
                <div class="send">
                    <img src="./assets/img/sendBtn.svg">
                    <span>Send</span>
                </div>
            </div>
        </div>`
        });

        location.reload()


    });
});

let postElement;
let postId;

$(".main-container").on("click", ".edit", function () {
    $(".third-sec").show(300);
    $(".first-sec").hide(600);

    postElement = $(this).closest(".my-post");
    postId = postElement.data("id");
})

$(".edit-btn").on("click", function () {

    console.log(postId);

    let myPostVal = $("#textAreaEdit").val();


    var settings = {
        "url": "https://blog-api-t6u0.onrender.com/posts/" + postId,
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "title": "Linkedin Post",
            "body": `${myPostVal}`
        }),
    };

    $.ajax(settings).done(function (response) {
        var updatedContent = response.content;
        postElement.find(".content p").text(updatedContent);
        location.reload()
    });
})
$(".main-container").on("click", ".delBtn", function () {
    console.log("işlendi");
    var postElement = $(this).closest(".my-post");
    var postId = postElement.data("id");
  
    var settings = {
      url: "https://blog-api-t6u0.onrender.com/posts/" + postId,
      method: "DELETE",
      timeout: 0,
      headers: {
        "Content-Type": "application/json"
      },
    };
  
    $.ajax(settings)
      .done(function (response) {
        postElement.remove();
      })
      .fail(function () {
        console.log("API istəyi uğursuz oldu...");
      });
  });