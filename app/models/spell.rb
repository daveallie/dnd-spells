class Spell < ActiveRecord::Base
  belongs_to :school
  has_many :masteries, dependent: :destroy
  has_many :dnd_classes, through: :masteries

end
