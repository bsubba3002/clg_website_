(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        var message_side, sendMessage;
        message_side = 'right';

        var getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }

            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';

            var replyText = getReply(text);

            message = new Message({
                text: text,
                message_side: 'left'
            });
            message.draw();

            if (replyText) {
                var replyMessage = new Message({
                    text: replyText,
                    message_side: 'right'
                });
                replyMessage.draw();
            }

            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        var getReply = function (userMessage) {
            if (userMessage.includes("admission") || userMessage.includes("1") || userMessage.includes("1.Admission")) {
                return "1. Personal Information\n2. Educational Background\n3. Interviews\n4. Language Proficiency";
            } else if (userMessage.includes("courses") || userMessage.includes("2")) {
                return "1. AIML\n2. Data Science\n3. Computer Science\n4. Electronics and Communication\n5. Mechanical Engineering\n6. Civil Engineering";
            } else if (userMessage.includes("events") || userMessage.includes("3")) {
                return "Of course, we have a lot of events here. 1. Deepavali 2. NavYug 3. College day";
            } else if (userMessage.includes("general information") || userMessage.includes("4")) {
                return "1.Library 2.Infrastructure 3.Canteen ";
            } else if (userMessage.includes("library")) {
                return "The VCET Library is housed in a spacious new building Krishna Chetana(ground floor).It also has a well equiped Digital Library.The library with a floor area of 877 sq meters. Segregated in to various sections like Lending, Reference, Digital library, Newspaper, Periodicals, Reading room etc.Library collection is about 47237 volumes with 6596 titles on Engineering, Management and Humanities; it contains Abstracts, Directories, Yearbooks, and Biographical sources, Textbooks, Thesis, Dissertations, Encyclopedias and General books.Library subscribes to 66 technical print journals and more than 29000 e-books.It has the capacity to accommodate 200 students at a time. It has membership with VTU Consortium, DELNET,NDL and it is enabled with Wi-Fi technology.The VCET also have a DIGITAL LIBRARY.Digital library having 12 systems with high speed internet facility. The digital Library exclusively used for the online access of e-Journals, e-books, conference proceedings, articles, educational videos and e-resources.";
            } else if (userMessage.includes("infrastructure")) {
                return "Serene lush green campus spread over 48 acres.Excellent Infrastructure and well equipped laboratories and workshops.Internet browsing facility with 230Mbps dedicated leased line for internet browsing.Student counseling and guidance by experienced faculty.";
            } else if (userMessage.includes("canteen") || userMessage.includes("4")) {
                return "1.Library 2.Infrastructure 3.Canteen ";
            } else {
                return "What do you want to know more about?1.Admission?2.Courses?3.Events?4.General Information?";
            }
        };

        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });

        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
    });
}.call(this));
