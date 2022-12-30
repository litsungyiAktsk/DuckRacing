
document.addEventListener('DOMContentLoaded', (event) => reset());

function reset()
{
    const memberNames = [
        "Aaron",
        "Akash",
        "Annie",
        "Blake",
        "Cloud",
        "Eric",
        "Faye",
        "Hal",
        "Hannah",
        "Harrison",
        "Jany",
        "Jerry Chen",
        "Jerry Tu",
        "Lyla",
        "Matt",
        "Nikola",
        "Scissor",
        "Shawn",
        "TsungYi",
        "Wade",
        "Wallace"
    ];

    let root = document.getElementById('content');
    root.innerHTML = '';

    let members_template = document.getElementById('member_template');
    let members_node = members_template.content.cloneNode(true);
    root.appendChild(members_node);

    let list_root = document.getElementById('members');
    let list_item_template = document.getElementById('list_item_template');
    for (let index in memberNames)
    {
        let name = memberNames[index];
        let node = list_item_template.content.cloneNode(true);
        let input = node.querySelectorAll('input')[0];
        let label = node.querySelectorAll('label')[0];
        input.id = name;
        input.setAttribute('value', name);
        label.innerText = name;
        label.setAttribute('for', name);
        list_root.appendChild(node);
    }

}

function start()
{
    let root = document.getElementById('content');

    let number = root.querySelectorAll('input[type=number]')[0].value;
    let checked_nodes = root.querySelectorAll('input[type=checkbox]:checked');
    let checked_members = [];
    for (let i = 0; i < checked_nodes.length; ++i)
    {
        item = checked_nodes[i];
        checked_members.push(item.id);
    }

    root.innerHTML = '';

    let racing_field_template = document.getElementById('racing_field_template');
    let racing_field = racing_field_template.content.cloneNode(true);

    let racing_lane_template = document.getElementById('racing_lane_template');
    let distances = [];
    for (let i = 0; i < checked_members.length; ++i)
    {
        let racing_lane_node = racing_lane_template.content.cloneNode(true);
        let name_node = racing_lane_node.querySelectorAll('.racing_lane_name')[0];
        name_node.innerText = checked_members[i];
        racing_field.appendChild(racing_lane_node);

        distances.push([checked_members[i], 0]);
    }

    root.appendChild(racing_field);
    countDown(distances, number);
}

function countDown(distances, number)
{
    let count = 3;
    var countDown = setInterval(() => {
        let node = document.querySelector('#count_down');
        if (count == 0)
        {
            node.innerText = "";
            clearInterval(countDown);
            racing(distances, number);
            // document.getElementById('duck_mp3').play();
            return;
        }

        node.innerText = `${count--}`;
    }, 1000);
}

function racing(distances, number)
{
    let root = document.getElementById('content');
    var racing = setInterval(() => {
        const SPEED = 10;
        const MAX_DISTANCE = 500;
        let ducks = root.querySelectorAll('.racing_duck');
        let end = false;
        for (let i = 0; i < ducks.length; ++i)
        {
            let duck = ducks[i];
            distances[i][1] += SPEED * Math.random();
            if (distances[i][1] >= MAX_DISTANCE)
            {
                end = true;
            }
            let width = Math.min(MAX_DISTANCE, Math.ceil(distances[i][1]));
            duck.style.width = `${width}px`;
        }

        if (end)
        {
            clearInterval(racing);
            scoring(distances, number);
            // document.getElementById('duck_mp3').pause();
            return;
        }
    }, 100);
}

function scoring(distances, number)
{
    distances.sort((a, b) => {
        if (a[1] > b[1]) {
            return -1
        } else if (a[1] < b[1]) {
            return 1
        } else {
            return 0;
        }
    });

    let root = document.getElementById('content');
    let racing_score_template = document.getElementById('racing_score_template');
    let racing_score_item_template = document.getElementById('racing_score_item_template');
    let racing_score = racing_score_template.content.cloneNode(true);
    let list = racing_score.querySelector('#scores');

    for (let index in distances) {
        if (parseInt(index) >= number)
        {
            break;
        }

        let racing_score_item = racing_score_item_template.content.cloneNode(true);
        let item_node = racing_score_item.querySelector('.racing_score_item');
        item_node.innerText = `${distances[index][0]}`;
        list.appendChild(item_node);
        console.log(`${distances[index][0]}: ${distances[index][1]}`);
    }

    root.appendChild(racing_score);
}
