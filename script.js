var zndex = 1;
var dragObject;
var isStop = false;
var able = true;
var shiftX, shiftY, box;
var interval;


function transparent(){ // функция для медленного исчезновения прямоугольников
    var bodyNodes = document.getElementById("target").childNodes; // получаем всех потомков элемента "target"
    for(var i=0;i<bodyNodes.length;++i){ 
       if( bodyNodes[i].className == 'rectang' ){
           if(bodyNodes[i].style.opacity==0){clearInterval(interval);break;} // выйти из функции, если прозрачность уже равна нулю
		   // а иначе уменьшаем уровнень прозрачности
           else bodyNodes[i].style.opacity-=0.05;
       }
    }
}

document.getElementById("target").addEventListener("mousedown", function(event){ // обработка события "опустили мышь"
	if (event.target.getAttribute("class") == "rectang") // проверка, что кликнули именно на одном из сгенерированных прямоугольников
	{
		if (event.which == 1 && event.shiftKey) { // если нажаты левая кнопка мыши и shift
			dragObject = event.target; // запоминаем нажатый прямоугольник
			dragObject.style.zIndex = zndex++; // увеличиваем z-index прямоугольника (переносим его вперёд)
			dragObject.ondragstart = function() {return false;}
		}
		else if (event.which == 1 && event.ctrlKey) { // если нажаты левая кнопка мыши и ctrl
			dragObject = event.target;
			dragObject.ondragstart = function() {return false;}
		}
		box = dragObject.getBoundingClientRect(); // возвращает прямоугольник ,ограничивающий элемент
		shiftX = event.pageX - box.left + pageXOffset; 
		shiftY = event.pageY - box.top + pageYOffset;
	}
});


document.getElementById("target").addEventListener("mousemove", function(event){  // обработка события "передвижение мыши"
	if (event.which == 1 && event.shiftKey) // если нажаты левая кнопка мыши и shift
	{
		
		dragObject.style.left = event.pageX - shiftX + "px"; // задаётся позиция относительно левого края экрана
		dragObject.style.top = event.pageY - shiftY + "px"; // задаётся позиция относительно верхнего края экрана
	}
	else if (event.which == 1 && event.ctrlKey) // если нажаты левая кнопка мыши и ctrl
	{
		dragObject.style.left = event.pageX - shiftX + "px"; // задаётся позиция относительно левого края экрана
		dragObject.style.top = event.pageY - shiftY + "px"; // задаётся позиция относительно верхнего края экрана
	}
});


document.getElementById("target").addEventListener("mouseup", function(event){   // обработка события "отпустили мышь"
	if (event.which == 1 && event.shiftKey) { // если нажаты левая кнопка мыши и shift
		dragObject = null; // очистка переменной dragObject
		able = false;
	}
	else if (event.which == 1 && event.ctrlKey) { // если нажаты левая кнопка мыши и ctrl
		dragObject = null; // очистка переменной dragObject
		able = false
	}
	else {
		able = true;
	}
});
var target = document.getElementById("target"); // запоминаем целевой div, где появляются прямоугольники 

document.getElementById("target").addEventListener("click", function(event){ //  регистрируем обработчик события click для target
	var w = document.getElementById("width").value; // сохраняем введённое значение ширины из соотв. поля формы
	var h = document.getElementById("height").value; // сохраняем введённое значение высоты из соотв. поля формы
	if(w!= undefined && h!= undefined ){
		createRect(w, h, event); // создаём прямоугольник с заданными параметрами
	}
});

addEventListener("keydown", function(event){ // регистрируем обработчик нажатия клавиши
	if (event.keyCode == 87) {					// (клавиши W)
		interval=setInterval(transparent,100); // выполнить код функции transparent много раз, с интервалом в 1/10 секунды
	}
});




function createRect(w, h, e) { //функция, создающая прямоугольник с заданными параметрами 
	if (w == "" && h == ""){ // если не введены ширина и высота...
		alert("Задайте ширину и высоту прямоугольника!"); 
	}
	else if (!isStop && able){ // если не нажато "Хватит" и можно создавать прямоугольники
		var newElement = document.createElement("div"); // создание нового div-а
		// задание параметров для нового div:
		newElement.style.height= h + "px";
		newElement.style.width=w + "px";
		newElement.setAttribute("class", "rectang");
		newElement.style.background = color();
		newElement.style.border="1px solid #999";
		newElement.style.zIndex = zndex++; // каждый новый прямоугольник лежит "выше" предыдущего
		newElement.style.position = 'absolute';
		newElement.style.opacity = 1; // gjkyjcnm. ytghjphfxysq
		moveAt(newElement, e);
		document.getElementById("target").appendChild(newElement); // добавляем новый div в качестве потомка элементу target
	}
}

function moveAt(element ,e){ // отвечает за то, куда передвинуть выбранный прямоугольник
	element.style.left = e.pageX + "px"; // задаётся позиция относительно левого края экрана
	element.style.top = e.pageY + "px"; // задаётся позиция относительно верхнего края экрана
}

function color() { // функция для выбора случайного цвета
	do {
		var r = Math.floor(Math.random()*256); 
		var g = Math.floor(Math.random()*256); 
		var b = Math.floor(Math.random()*256); 
		var color = "#" + r.toString(16) + g.toString(16) + b.toString(16); 
		// преобразуем сгенерированные числа в строки, где они отображены в 16-ичной системе, и добавляем к коду цвета
	} while (color.length != 7); // т.к. код цвета должен состоять из 7 символов
	return color;
}

document.getElementById("enough").addEventListener("click", function(event){ //обработчик нажатия на кнопку "хватит"
// изменяем значение на противоположное:
	if (isStop)
		isStop = false;
	else
		isStop = true;
	event.preventDefault(); // отменяем действия по умолчанию
});

// когда изменяются значения ширины и/или высоты, отменяется действие кнопки "хватит"
document.getElementById("width").addEventListener("change", function(){ 
	isStop = false;
});

document.getElementById("height").addEventListener("change", function(){
	isStop = false;
});
