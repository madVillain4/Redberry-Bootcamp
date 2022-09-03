const positions = {};

const loadSelectOptions = (selectDom, itemsArr) => {
  const optionsDom = itemsArr.map((item) => {
    return $("<option></option>").attr("value", item.id).text(item.name);
  });

  selectDom.append(...optionsDom);
};

const loadTeams = (items) => {
  const select = $("#teams");

  loadSelectOptions(select, items);
};

const loadPositions = (team_id) => {
  const items = positions[team_id];

  const select = $("#positions");

  select.empty();
  select.append("<option>პოზიცია</option>");

  if (items) {
    loadSelectOptions(select, items);
  }
};

const onTeamChange = (e) => {
  loadPositions(e.target.value);
};

const empInfo = (e) => {
  e.preventDefault();

  const $form = $(e.target);
  console.log($form);
};

$(document).ready(() => {
  $.get("https://pcfy.redberryinternship.ge/api/teams", (data) => {
    loadTeams(data.data);
  });

  $.get("https://pcfy.redberryinternship.ge/api/positions", (data) => {
    for (let i = 0; i < data.data.length; i++) {
      const item = data.data[i];

      if (!positions[item.team_id]) {
        positions[item.team_id] = [];
      }

      positions[item.team_id].push(item);
    }
  });
});
