sprint_editor.registerBlock('my_advantages', function ($, $el, data, settings) {

    var settings = settings || {};

    // var areas = [
    //     {
    //         dataKey: 'image',
    //         blockName: 'image',
    //         container: '.sp-block-my_advantages-image'
    //     }
    // ];

    // Заготовка для данных
    data = $.extend({
        elements: [
            {
                text: 'test',
                value: 'test2',
                block: {
                    name: 'image'
                }
            },
        ]
    }, data);


    this.getData = function () {
        return data;
    };

    this.collectData = function () {


        data.elements = [];

        // Ищем все добавленные контейнеры
        $el.find('.sp-block-my_advantages-container').each(function () {

            // Создаем и заполняем элемент данными
            let element = {
                text: '',
                value: '',
                block: {
                    name: 'image'
                }
            };

            element.text = $(this).find('.sp-block-my_advantages-text').val();
            element.value = $(this).find('.sp-block-my_advantages-textarea').val();


            // Забираем данные с блока image
            let ImageBlock = $(this).find('.sp-block-my_advantages-image');

            element.block = sprint_editor.collectData(
                ImageBlock.data('uid')
            )

            // Ищем блок с изображением
            // $(this).find('.sp-block-my_advantages-image').each(function () {
            //     element.block.push(sprint_editor.collectData(
            //         $(this).data('uid')
            //     ))
            // });

            data.elements.push(element);
        })

        return data;
    };

    // this.getAreas = function () {
    //     return areas;
    // };

    this.afterRender = function () {

        // Получаем контейнер для отображения содержания контента
        let $container = $el.children('.sp-block-my_advantages-result');

        // Запускаем перебор данных (data) и на их основе создаем представление
        $.each(data.elements, function (index, element) {
            addblock(element, $container);
        });

        // Обработка клика по кнопке добавить блок
        $el.on('click', '.sp-block-my_advantages-btn-add', function () {
            addblock( {
                text: '',
                value: '',
                block: {
                    name: 'image'
                }
            }, $container)

        });


        // Функция для создания блока
        function addblock(element, $container) {

            // Уникальный id
            let uid = sprint_editor.makeUid('my_advantages');

            // Получаем шаблон компонента
            let $content =  $(sprint_editor.renderTemplate('my_advantages-items',
                {
                    elements: [
                        {
                            uid: uid,
                            text: element.text,
                            value: element.value,
                        }
                    ]
                }))

            // Добавляем сгенерированный контент
            $container.append($content)


            // Инициализируем новый блок
            var elEntry = sprint_editor.initblock(
                $,
                $content.find('.sp-block-my_advantages-image'), //$elBlock,
                element.block.name, //blockData.name,
                element.block,
                // blockSettings,
                // currentEditorParams
            );

            // sprint_editor.initblockAreas(
            //     $,
            //     $content.find('.sp-block-my_advantages-image'), //$elBlock,
            //     elEntry, //elEntry,
            //     //currentEditorParams
            // );

            // Регистрируем
            sprint_editor.registerEntry(uid, elEntry);
        }
    }


});